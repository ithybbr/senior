import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "../theme/ThemeContext";

const panels = [4, 3, 2, 23, 15, 16, 18, 19, 20, 27,24,26, 28,29,33, 13,11,12, 31,32,30, 34,35,36, 37,38,39, 40,41,42];

const BASE_URL =
  "http://192.168.0.127:3000/d-solo/adh5qj6/enviromental-data";

const PcScreen: React.FC = () => {
  const { theme } = useTheme();

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

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.screenBackground },
      ]}
    >
      {panels.map((p) => (
        <View
          key={p}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
        >
          <WebView
            source={{
              uri: `${BASE_URL}?panelId=panel-${p}&__feature.dashboardSceneSolo=true&kiosk`,
            }}
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden={true}
            scrollEnabled={false}
            bounces={false}
            injectedJavaScript={noInteractionJS}
            style={styles.webview}
          />
          {/* Invisible blocker above the WebView */}
          <View style={StyleSheet.absoluteFill} pointerEvents="auto" />
        </View >
      ))}
    </ScrollView>
  );
};

export default PcScreen;

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
