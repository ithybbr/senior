twinreact is a mobile app that allows users to monitor enviromental and PC usage data.

INSTRUCTIONS:
1. app works locally, so the users need to be connected to IoTlab_Public wifi.
2. if the dashboards don't load correctly, users can use pull up gesture to refresh the page.
3. there are in total 5 tabs: PCs which shows collected data from PCs, Sensors that displays enviromental data, ML page which shows quantity of people in atrium and live images, 2d map which shows location of PCs and Sensors, and About section.
4. there is dark mode option at the end of the last tab.

Implemented in React Native. Grafana Server and InfluxDB are on WorkStation 7, ML model, microcontroller script, and Flask server which displays live images are on WorkStation 12. WorkStation 7 is mqtt server, other PCs are mqtt clients. Mqtt messages are sent using Crontab (crontab -l to get where scripts are stored). 

ml:
weights has .pt files that store ml models
images are evaluation results