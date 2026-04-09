import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "../theme/ThemeContext";

const panels = [3, 15, 19 ,24, 29, 11, 32, 35, 38, 41];
const pcs = [4, 17, 18, 27, 28, 13, 31, 34, 37, 40];
const BASE_URL =
  "http://192.168.0.127:3000/d-solo/adh5qj6/enviromental-data";

const PcScreen: React.FC = () => {
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
  const getWebviewProps = (js: any, style: any) => ({
    cacheEnabled: true,
    cacheMode: "LOAD_DEFAULT" as const,
    domStorageEnabled: true,
    thirdPartyCookiesEnabled: true,
    importantForAccessibility: "no-hide-descendants" as const,
    accessibilityElementsHidden: true,
    scrollEnabled: false,
    bounces: false,
    injectedJavaScript: js,
    style,
  });
  const reloadAllPanels = () => {
    setRefreshing(true);

    panels.forEach((panelId) => {
      webViewRefs.current[panelId]?.reload();
    });
    pcs.forEach((panelId) => {
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
      <View style={styles.gridContainer}>
        {pcs.map((p) => (
          <View
            key={p}
            style={[styles.scard, { backgroundColor: theme.cardBackground }]}
          >
            <WebView {...getWebviewProps(noInteractionJS, styles.webview)}
              ref={(ref) => {
                webViewRefs.current[p] = ref;
              }}
              source={{
                uri: `${BASE_URL}?panelId=panel-${p}&__feature.dashboardSceneSolo=true&kiosk`,
              }}
            />

            <View style={StyleSheet.absoluteFill} pointerEvents="auto" />
          </View>
        ))}
      </View>
      <View style={styles.listContainer}>
        {panels.map((p) => (
          <View
            key={p}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
          >
            <WebView {...getWebviewProps(noInteractionJS, styles.webview)}
              ref={(ref) => {
                webViewRefs.current[p] = ref;
              }}
              source={{
                uri: `${BASE_URL}?panelId=panel-${p}&__feature.dashboardSceneSolo=true&kiosk`,
              }}
            />

            <View style={StyleSheet.absoluteFill} pointerEvents="auto" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default PcScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listContainer: {
    marginTop: 20,
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
  scard: {
    width: "20%",
    height: 70,
    margin: 5,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  webview: {
    flex: 1,
  },
});