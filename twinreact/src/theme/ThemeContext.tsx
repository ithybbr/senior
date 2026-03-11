import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

type ThemeMode = "light" | "dark";

type ThemeColors = {
  screenBackground: string;
  headerBackground: string;
  headerTitle: string;
  headerSubtitle: string;
  headerDivider: string;
  headerDescription: string;
  sectionTitle: string;
  cardBackground: string;
  cardTitle: string;
  cardText: string;
  footerText: string;
  footerMuted: string;
  tabBarBackground: string;
  tabActiveTint: string;
  tabInactiveTint: string;
  mapBackground: string;
  mapBorder: string;
  mapRoomFill: string;
  mapPcFill: string;
  mapText: string;
  mapSensorFill: string;
};

type ThemeContextValue = {
  mode: ThemeMode;
  theme: ThemeColors;
  toggleTheme: () => void;
};

const lightTheme: ThemeColors = {
  screenBackground: "#fcf8f8",
  headerBackground: "#1E40AF",
  headerTitle: "#FFFFFF",
  headerSubtitle: "#BFDBFE",
  headerDivider: "#60A5FA",
  headerDescription: "#E2E8F0",
  sectionTitle: "#1E293B",
  cardBackground: "#FFFFFF",
  cardTitle: "#1E3A8A",
  cardText: "#64748B",
  footerText: "#94A3B8",
  footerMuted: "#64748B",
  tabBarBackground: "#111111",
  tabActiveTint: "#4CAF50",
  tabInactiveTint: "#9CA3AF",
  mapBackground: "#fafaf9",
  mapBorder: "#e0e0e0",
  mapRoomFill: "#e8f0fe",
  mapPcFill: "#e8f0fe",
  mapText: "#111111",
  mapSensorFill: "#e8f0fe",
};

const darkTheme: ThemeColors = {
  screenBackground: "#020617",
  headerBackground: "#020617",
  headerTitle: "#E5E7EB",
  headerSubtitle: "#9CA3AF",
  headerDivider: "#4B5563",
  headerDescription: "#9CA3AF",
  sectionTitle: "#E5E7EB",
  cardBackground: "#020617",
  cardTitle: "#E5E7EB",
  cardText: "#9CA3AF",
  footerText: "#6B7280",
  footerMuted: "#9CA3AF",
  tabBarBackground: "#020617",
  tabActiveTint: "#38BDF8",
  tabInactiveTint: "#6B7280",
  mapBackground: "#020617",
  mapBorder: "#1E293B",
  mapRoomFill: "#111827",
  mapPcFill: "#111827",
  mapText: "#E5E7EB",
  mapSensorFill: "#111827",
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      theme: mode === "light" ? lightTheme : darkTheme,
      toggleTheme: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
