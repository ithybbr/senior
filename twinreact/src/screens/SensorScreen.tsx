import React, { useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, RefreshControl } from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "../theme/ThemeContext";

const panels = [8, 7, 10, 14];

const BASE_URL =
  "http://192.168.0.127:3000/d-solo/adh5qj6/enviromental-data";

const SensorScreen: React.FC = () => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const webViewRefs = useRef<Record<number, WebView | null>>({});
const noInteractionJS = `
  (function () {
    const css = document.createElement('style');
    css.innerHTML = \`
      html, body {
        overflow: hidden !important;
        height: 100% !important;
        max-height: 100% !important;
        touch-action: none !important;
        overscroll-behavior: none !important;
        -webkit-overflow-scrolling: auto !important;
        user-select: none !important;
        -webkit-user-select: none !important;
      }

      * {
        -webkit-touch-callout: none !important;
      }

      a, button, input, textarea, select, [contenteditable="true"] {
        pointer-events: none !important;
      }
    \`;
    document.head.appendChild(css);

    const prevent = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    ["touchstart", "touchmove", "touchend", "wheel", "scroll"].forEach((event) => {
      document.addEventListener(event, prevent, { passive: false, capture: true });
      window.addEventListener(event, prevent, { passive: false, capture: true });
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    true;
  })();
`;

  const reloadAllPanels = () => {
    setRefreshing(true);

    panels.forEach((panelId) => {
      webViewRefs.current[panelId]?.reload();
    });

    // stop spinner after a moment
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.screenBackground },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={reloadAllPanels}
        />
      }
    >
      {panels.map((p) => (
        <View
          key={p}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
        >
          <WebView
            ref={(ref) => {
              webViewRefs.current[p] = ref;
            }}
            source={{
              uri: `${BASE_URL}?panelId=panel-${p}&__feature.dashboardSceneSolo=true&kiosk`,
            }}
            cacheEnabled={true}
            cacheMode="LOAD_DEFAULT"
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden={true}
            scrollEnabled={false}
            bounces={false}
            injectedJavaScript={noInteractionJS}
            style={styles.webview}
          />
          {/* Invisible blocker above the WebView */}
          <View style={StyleSheet.absoluteFill} pointerEvents="auto" />
        </View>
      ))}
    </ScrollView>
  );
};

export default SensorScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },

  card: {
    width: Dimensions.get("window").width - 32,
    height: 250,
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },

  webview: {
    flex: 1,
  },
});
