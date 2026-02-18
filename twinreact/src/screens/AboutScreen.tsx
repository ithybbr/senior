import { View, Text, StatusBar, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Digital Twin</Text>
          <Text style={styles.headerSubtitle}>Scope Lab Monitoring</Text>
          <View style={styles.divider} />
          <Text style={styles.description}>
            A centralized system designed to visualize, compare, and analyze 
            laboratory conditions and equipment status in real-time.
          </Text>
        </View>

        <View style={styles.content}>
          {/* Section: How it Works */}
          <Text style={styles.sectionTitle}>System Architecture</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardEmoji}>📡</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Data Collection</Text>
              <Text style={styles.cardText}>
                Uses ESP32 and Raspberry Pi Pico W with DHT11 (Temp/Humidity) 
                and MQ-3 (Gas) sensors to monitor the lab environment.
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardEmoji}>🌐</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Connectivity</Text>
              <Text style={styles.cardText}>
                Seamless wireless transmission via MQTT protocol (Mosquitto) 
                ensuring low-latency updates across the network.
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardEmoji}>📊</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Storage & UI</Text>
              <Text style={styles.cardText}>
                Time-stamped data is managed in InfluxDB and visualized 
                through dynamic Grafana dashboards and this mobile app.
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardEmoji}>🧠</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Intelligence</Text>
              <Text style={styles.cardText}>
                Integrated ML layer for anomaly detection and automated 
                people counting using visual inputs.
              </Text>
            </View>
          </View>

          {/* Footer Info */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Developed by:</Text>
            <Text style={styles.teamText}>Saida K., Asset K., Miras M., Nursultan B., Sherniyaz Z.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf8f8",
  },
  headerLogo: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  header: {
    backgroundColor: "#1E40AF", // Deep blue
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#BFDBFE",
    marginBottom: 15,
  },
  divider: {
    height: 3,
    width: 40,
    backgroundColor: "#60A5FA",
    borderRadius: 2,
    marginBottom: 15,
  },
  description: {
    textAlign: "center",
    color: "#E2E8F0",
    lineHeight: 22,
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 15,
    marginLeft: 5,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  cardEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },
  footer: {
    marginTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  teamText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
});