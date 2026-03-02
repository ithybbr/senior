import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Rect, Line, G, Text as SvgText, Path, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Layout ────────────────────────────────────────────────────────────────────

const MAP_W = 340;
const MAP_H = 480;
const PADDING = 16;

interface Room {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
interface HideStroke{
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Pc{
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Sensor{
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
const ROOMS: Room[] = [
  { id: 'room-a', x: 20, y: 20, w: 155, h: 180 },
  { id: 'room-b', x: 180, y: 20, w: 140, h: 180 },
  { id: 'room-c', x: 20, y: 205, w: 300, h: 130 },
  { id: 'room-d', x: 150, y: 340, w: 170, h: 110 },
  { id: 'room-e', x: 20, y: 335, w: 125, h: 115 },
];
const HIDE_STROKES: HideStroke[] = [
  { id: 'hide-1', x: 21, y: 330, w: 123, h: 10 },
];
const PCS: Pc[] = [
  { id: 'pc-1', label: 'w1', x: 110, y: 50, w: 40, h: 20 },
  { id: 'pc-2', label: 'w2', x: 170, y: 220, w: 40, h: 20 },
  { id: 'pc-3', label: 'w3', x: 215, y: 220, w: 40, h: 20 },
  { id: 'pc-4', label: 'w4', x: 215, y: 300, w: 40, h: 20 },
  { id: 'pc-5', label: 'w7', x: 200, y: 160, w: 40, h: 20 },
  { id: 'pc-6', label: 'w12', x: 200, y: 100, w: 40, h: 20 },
  { id: 'pc-7', label: 'w8', x: 80, y: 220, w: 40, h: 20 },
  { id: 'pc-8', label: 'chirp', x: 110, y: 120, w: 40, h: 20 },
  { id: 'r-1', label: 'r1', x: 110, y: 150, w: 40, h: 20 },
  { id: 'r-2', label: 'r2', x: 125, y: 220, w: 40, h: 20 },
];
const SENSORS: Sensor[] = [
  { id: 'sensor-1', label: 'temp/humidity', x: 150, y: 310, w: 50, h: 20 },
  { id: 'sensor-2', label: 'sonic/presence', x: 250, y: 170, w: 40, h: 20 },
  { id: 'sensor-3', label: 'microphone', x: 275, y: 360, w: 40, h: 20 },
];
export default function _2dScreen() {
  const scale = (SCREEN_WIDTH - PADDING * 2) / MAP_W;

  return (
    <View style={styles.container}>
      <View style={styles.mapWrapper}>
        <Svg
          width={MAP_W * scale}
          height={MAP_H * scale}
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        >
          {/* Outer boundary */}
          <Rect
            x={15} y={15}
            width={MAP_W - 30} height={MAP_H - 30}
            fill="#f7f7f5"
            stroke="#222"
            strokeWidth={2}
            rx={2}
          />

          {/* Rooms */}
          {ROOMS.map((room) => {
            return (
              <G key={room.id}>
                <Rect
                  x={room.x} y={room.y}
                  width={room.w} height={room.h}
                  fill={'#e8f0fe'}
                  stroke="#222"
                  strokeWidth={1.5}
                />
              </G>
            );
          })}

          {/* Hide Strokes */}
          {HIDE_STROKES.map((stroke) => {
            return (
              <Rect key={stroke.id}
                x={stroke.x} y={stroke.y}
                width={stroke.w} height={stroke.h}
                fill={'#e8f0fe'}
              />
            );
          })}
          {PCS.map((pc) => {
            return (
              <G key={pc.id}>
                <Rect
                  x={pc.x} y={pc.y}
                  width={pc.w} height={pc.h}
                  fill={'#e8f0fe'}
                  stroke="#222"
                  strokeWidth={1.5}
                />
                <SvgText
                  x={pc.x + pc.w / 2}
                  y={pc.y + pc.h / 2}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#111"
                >
                  {pc.label}
                </SvgText>
              </G>
            );
          })}
          {SENSORS.map((sensor) => {
            return (
              <G key={sensor.id}>
                <Circle
                  cx={sensor.x} cy={sensor.y}
                  r={sensor.w / 14}
                  fill={'#e8f0fe'}
                  stroke="#222"
                  strokeWidth={1.5}
                />
                <SvgText
                  x={sensor.x + sensor.w / 2}
                  y={sensor.y + sensor.h / 2}
                  textAnchor="middle"
                  fontSize={8}
                  fill="#111"
                > 
                  {sensor.label}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaf9',
    paddingTop: 48,
    paddingHorizontal: PADDING,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 0.5,
    fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  mapWrapper: {
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f7f7f5',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#e8f0fe',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c5d5f5',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a56db',
    fontFamily: 'monospace',
  },
  pillClose: {
    fontSize: 12,
    color: '#1a56db',
    fontWeight: '700',
  },
});