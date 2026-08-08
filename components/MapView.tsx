'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { QuietSpace, Disruption } from '@/lib/types';

export interface StopMarker {
  id: string;
  position: [number, number];
  label: string;
  kind: 'origin' | 'destination';
}

interface MapViewProps {
  center: [number, number];
  zoom?: number;
  height?: string;
  quietSpaces?: QuietSpace[];
  disruptions?: Disruption[];
  stops?: StopMarker[];
  routeLine?: [number, number][];
}

const LEGEND_COLORS = {
  stop: '#3D6FB4',
  quiet: '#8B5FBF',
  disruption: '#C0453B'
};

function makeDivIcon(color: string, size = 16) {
  return L.divIcon({
    className: '',
    html: `<span style="
      display:block;
      width:${size}px;
      height:${size}px;
      background:${color};
      border:2px solid white;
      border-radius:50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.35);
    "></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
}

export default function MapView({
  center,
  zoom = 14,
  height = '480px',
  quietSpaces = [],
  disruptions = [],
  stops = [],
  routeLine
}: MapViewProps) {
  const stopIcon = makeDivIcon(LEGEND_COLORS.stop, 18);
  const quietIcon = makeDivIcon(LEGEND_COLORS.quiet, 14);
  const disruptionIcon = makeDivIcon(LEGEND_COLORS.disruption, 16);

  return (
    <div>
      <div style={{ height }} className="rounded-card overflow-hidden border border-line">
        <MapContainer center={center} zoom={zoom} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {routeLine && routeLine.length > 1 && (
            <Polyline positions={routeLine} pathOptions={{ color: '#3F6E5D', weight: 4, opacity: 0.8 }} />
          )}

          {stops.map((stop) => (
            <Marker key={stop.id} position={stop.position} icon={stopIcon}>
              <Popup>
                <strong>{stop.label}</strong>
                <br />
                {stop.kind === 'origin' ? 'Journey start' : 'Journey end'}
              </Popup>
            </Marker>
          ))}

          {quietSpaces.map((space) => (
            <Marker key={space.id} position={[space.lat, space.lng]} icon={quietIcon}>
              <Popup>
                <strong>{space.name}</strong>
                <br />
                {space.type}
                <br />
                <span className="text-inkSoft">{space.sensoryNotes}</span>
              </Popup>
            </Marker>
          ))}

          {disruptions.map((d) => (
            <Marker key={d.id} position={[d.lat, d.lng]} icon={disruptionIcon}>
              <Popup>
                <strong>{d.title}</strong>
                <br />
                {d.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-inkSoft">
        <li className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: LEGEND_COLORS.stop }} />
          Transport stop
        </li>
        <li className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: LEGEND_COLORS.quiet }} />
          Quiet space
        </li>
        <li className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: LEGEND_COLORS.disruption }} />
          Disruption
        </li>
      </ul>
    </div>
  );
}
