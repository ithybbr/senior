Grafana Server and InfluxDB are on WorkStation 7, ML app and Flask server which displays live images are on WorkStation 12. WorkStation 7 is mqtt server, other PCs are mqtt clients. Mqtt messages are sent using Crontab (crontab -l to get where scripts are stored).

---

twinreact is a mobile app that allows users to monitor enviromental and PC usage data.

INSTRUCTIONS:
1. app works locally, so the users need to be connected to IoTlab_Public wifi.
2. if the dashboards don't load correctly, users can use pull up gesture to refresh the page.
3. there are in total 5 tabs: PCs which shows collected data from PCs, Sensors that displays enviromental data, ML page which shows quantity of people in atrium and live images, 2d map which shows location of PCs and Sensors, and About section.
4. there is dark mode option at the end of the last tab.

Implemented in React Native.

Download the latest release from the [Releases page](https://github.com/ithybbr/senior/releases/latest).

---

### ml

- **weights** – contains `.pt` files (trained ML models)
- **images** – evaluation results
- **detector**
  - `people_detector.py` – runs ML model
  - `server.py` – runs server that shows output from detector
      
---

microcontroller has a general script for microcontrollers. it uses threading, unnecessary (the ones that are not present for microcontroller) function calls are commented out.

---

### pcs
  - **`script.sh`** - sends message with pc data to the server via mqtt.
  - **`start.sh`** - sets up crontab for script.sh

INSTRUCTIONS:
1. download scripts (`script.sh` and `start.sh`) inside of pcs directory.
2. put these scripts in the same folder
3. run `start.sh`. It will set up crontab scheduler for `script.sh`.
4. Create dashboard in the Grafana (on WorkStation 7).
> [!TIP]
> You can duplicate existing dashboards (one for status and the other one for cpu and memory usage).
> After that, change the hostname of the mqtt topic "pcs/$(hostname)".
> To get the hostname you can run `hostname` command in the terminal, look into tmp/script.log, or get all the topics in InfluxDB(on WorkStation 7) (Data explorer -> Bucket(Test1) -> Filter(topic))

> [!NOTE]
> PC needs to be connected to IoTlab_Public otherwise it won't work
