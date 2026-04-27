import network
from simple import MQTTClient
import time
import struct
from machine import Pin, time_pulse_us, ADC
import dht
import _thread
import asyncio
import ujson
import math
import ubinascii

mqtt_connected = False

device_id = ubinascii.hexlify(network.WLAN().config('mac')).decode()
topic = f"sensors/{device_id}"

SSID = 'IoTlab_Public'
KEY = 'iotlabwifi'
sensor = dht.DHT11(Pin(4))

trigger = Pin(5, Pin.OUT)
echo = Pin(18, Pin.IN)

interval = 5

def sub_cb(topic, msg):
   print(msg)

wlan = network.WLAN(network.STA_IF)
if not wlan.isconnected():
        print('connecting to network...')
        wlan.active(True)
        wlan.connect(SSID, KEY)
        while not wlan.isconnected():
            pass
print('network config:', wlan.ifconfig())

client = MQTTClient("MQTTConsumer", "192.168.0.127", port=1883)
client.connect()

client.set_callback(sub_cb)
minD = 3000

async def Countdown():
    global minD
    while True:
        await asyncio.sleep(interval)
        try:
            data = {
                "presence": minD
            }
            json_data = ujson.dumps(data)
            if mqtt_connected:
                client.publish(topic + "/Ultra", json_data)
                print("Published min distance:", round(minD, 2))
        except OSError:
            print("MQTT publish failed, skipping")
        minD = 3000  # reset for next interval
        
async def Sensor():
    while True:
        try:
            sensor.measure()  # Read sensor
            temperature = sensor.temperature()  # °C
            humidity = sensor.humidity()        # %

            print("Temp:", temperature, "°C", "Humidity:", humidity, "%")

            # Publish to MQTT 
            data = {
                "temperature": temperature,
                "humidity": humidity
            }
            json_data = ujson.dumps(data)
            
            client.publish(topic +"/DHT11", json_data)
            print("Published to MQTT")

            # Check for incoming messages (optional)
            client.check_msg()

        except OSError as e:
            print("Sensor read failed:", e)
        await asyncio.sleep(interval)


async def Infra():

    infrasens = Pin(13, Pin.IN)
    while True:
        valv = infrasens.value()
        if valv == 0:
            print("Obstacle detected!")
        else:
            print("No obstacle")
        
        data = {
                "presence": valv
            }
        json_data = ujson.dumps(data)
        
        if mqtt_connected:
            client.publish(topic + "/Infrared", json_data)
        else:
            print("MQTT not connected, skipping Infra publish")
        
        await asyncio.sleep(interval)



async def Ultra():
    global minD
    while True:
        trigger.off()
        time.sleep_us(2)
        trigger.on()
        time.sleep_us(20)
        trigger.off()

        duration = time_pulse_us(echo, 1, 60000)
        if duration > 0:
            distance = duration / 58.0
            if distance < minD:
                minD = distance  # update global minimum
        await asyncio.sleep(0.05)  # small delay to avoid blocking


async def Microphone():
    adc = ADC(Pin(34))
    adc.atten(ADC.ATTN_11DB)
    adc.width(ADC.WIDTH_12BIT)

    SAMPLES = 200
    V_REF = 0.005  # reference RMS voltage for 0 dB (adjust empirically)

    while True:
        values = [adc.read() for _ in range(SAMPLES)]
        # convert ADC to voltage (0-3.3V)
        voltages = [v * 3.3 / 4095 for v in values]
        # calculate DC offset (average)
        dc = sum(voltages) / SAMPLES
        # calculate RMS AC
        rms = math.sqrt(sum((v - dc)**2 for v in voltages) / SAMPLES)
        
        # approximate dB
        if rms < V_REF:
            dB = 0
        else:
            dB = 20 * math.log10(rms / V_REF)
        
        print("RMS:", round(rms, 3), "V", "Approx dB:", round(dB, 1))
        
        data = {
                "RMS": rms,
                "dB": dB
            }
        json_data = ujson.dumps(data)
        client.publish(topic +"/Microphone", json_data)
        await asyncio.sleep(interval)
        
async def Internet():
    global mqtt_connected
    while True:
        if not wlan.isconnected():
            print("Reconnecting Wi-Fi...")
            wlan.active(True)
            wlan.connect(SSID, KEY)
            # wait until connected
            while not wlan.isconnected():
                await asyncio.sleep(1)
        
        # try to connect MQTT safely
        try:
            client.connect()
            mqtt_connected = True
            print("MQTT connected")
        except OSError:
            mqtt_connected = False
            await asyncio.sleep(1)
        
        await asyncio.sleep(interval)

        
    
async def main():
    asyncio.create_task(Internet())
    #asyncio.create_task(Sensor())
    #asyncio.create_task(Sensor())
    #asyncio.create_task(Infra())
    asyncio.create_task(Ultra())
    asyncio.create_task(Countdown())
    #asyncio.create_task(Microphone())
    

    while True:
        await asyncio.sleep(3)

asyncio.run(main())






