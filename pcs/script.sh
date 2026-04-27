#!/bin/bash

# ============================================
# MQTT System Metrics Publisher (Debian/Linux)
# ============================================

BROKER="192.168.0.127"     # MQTT broker IP or hostname
PORT="1883"                # MQTT port (default 1883)
TOPIC="pcs/$(hostname)"     # Topic to publish to
HOSTNAME=$(hostname)       # Device name for identification
if ! command -v mosquitto_pub &> /dev/null; then
    echo "Error: mosquitto_pub not found. Install it with: sudo apt install mosquitto-clients"
    exit 1
fi

echo "Starting MQTT metrics publisher..."
echo "Broker: $BROKER:$PORT | Topic: $TOPIC | Interval: ${INTERVAL}s"
echo "Press Ctrl+C to stop."

    # Get system metrics
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8}')              # CPU usage %
MEM=$(free | awk '/Mem:/ {printf("%.2f"), $3/$2*100}')                # Memory usage %
UPTIME=$(awk '{print $1}' /proc/uptime)                               # Uptime in seconds

    # Build JSON payload
PAYLOAD=$(cat <<EOF
{
 "host": "$HOSTNAME",
  "cpu": $CPU,
  "memory": $MEM,
  "uptime": $UPTIME 
}
EOF
)
mosquitto_pub -h "$BROKER" -p "$PORT" -t "$TOPIC" -m "$PAYLOAD"

echo "$(date '+%Y-%m-%d %H:%M:%S') → $PAYLOAD"

exit 0
