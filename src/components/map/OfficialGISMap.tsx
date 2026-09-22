'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfficialMadrasa, BANGLADESH_CENTER, BANGLADESH_DEFAULT_ZOOM } from '@/lib/geo-data';
import { Layers, Maximize2, Minimize2, Navigation, RotateCcw, ExternalLink, MessageCircle, Phone, Award } from 'lucide-react';

interface OfficialGISMapProps {
  madrasas: OfficialMadrasa[];
  selectedMadrasa: OfficialMadrasa | null;
  onSelectMadrasa: (m: OfficialMadrasa) => void;
  centerLat?: number;
  centerLng?: number;
  zoomLevel?: number;
  isSatellite?: boolean;
  onToggleSatellite?: () => void;
}

export default function OfficialGISMap({
  madrasas,
  selectedMadrasa,
  onSelectMadrasa,
  centerLat,
  centerLng,
  zoomLevel,
  isSatellite = false,
  onToggleSatellite,
}: OfficialGISMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersGroupRef = useRef<LayerGroup | null>(null);
  const tileLayerRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize Map
  useEffect(() => {
    let isCancelled = false;

    async function init() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import('leaflet')).default;
      if (isCancelled || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: BANGLADESH_CENTER,
        zoom: BANGLADESH_DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
        minZoom: 6,
        maxZoom: 18,
      });

      // Add Attribution cleanly in corner
      L.control.attribution({ position: 'bottomright', prefix: false })
        .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | নূরহাব GIS')
        .addTo(map);

      // Tile Layer (Standard CartoDB / OSM)
      const streetTiles = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          subdomains: 'abcd',
          maxZoom: 19,
        }
      );

      streetTiles.addTo(map);
      tileLayerRef.current = streetTiles;

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;

      mapInstanceRef.current = map;
      setMapLoaded(true);
    }

    init();

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Satellite switch
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
      }

      if (isSatellite) {
        // Esri World Imagery (Satellite)
        tileLayerRef.current = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { maxZoom: 18 }
        ).addTo(map);
      } else {
        // High-contrast clean GIS map with full Bangladesh division/district/upazila labels
        tileLayerRef.current = L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          { subdomains: 'abcd', maxZoom: 19 }
        ).addTo(map);
      }
    });
  }, [isSatellite, mapLoaded]);

  // Handle Camera flyTo when center or zoom changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const targetLat = centerLat ?? BANGLADESH_CENTER[0];
    const targetLng = centerLng ?? BANGLADESH_CENTER[1];
    const targetZoom = zoomLevel ?? BANGLADESH_DEFAULT_ZOOM;

    map.flyTo([targetLat, targetLng], targetZoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [centerLat, centerLng, zoomLevel, mapLoaded]);

  // Render Markers
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !markersGroupRef.current) return;

    import('leaflet').then((L) => {
      const markersGroup = markersGroupRef.current;
      if (!markersGroup || !mapInstanceRef.current) return;

      markersGroup.clearLayers();

      madrasas.forEach((m) => {
        const isSelected = selectedMadrasa?.id === m.id;

        // Custom HTML radar divIcon
        const iconColor = m.type === 'qawmi' ? '#059669' : m.type === 'hifz' ? '#d97706' : '#2563eb';
        const pulseColor = m.type === 'qawmi' ? 'rgba(16, 185, 129, 0.4)' : m.type === 'hifz' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(59, 130, 246, 0.4)';
        
        const html = `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <!-- Radar Pulse -->
            <div style="
              position: absolute;
              width: ${isSelected ? '46px' : '34px'};
              height: ${isSelected ? '46px' : '34px'};
              border-radius: 50%;
              background: ${pulseColor};
              animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <!-- Center Pin Core -->
            <div style="
              position: relative;
              width: ${isSelected ? '28px' : '20px'};
              height: ${isSelected ? '28px' : '20px'};
              background: ${iconColor};
              border: 3px solid #ffffff;
              border-radius: 50%;
              box-shadow: 0 4px 12px rgba(0,0,0,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 10px;
              font-weight: bold;
              transition: all 0.2s ease;
            ">
              ${isSelected ? '★' : '•'}
            </div>
            <!-- Floating Label -->
            <div style="
              position: absolute;
              top: 24px;
              background: rgba(15, 23, 42, 0.92);
              color: #f8fafc;
              padding: 2px 8px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              white-space: nowrap;
              border: 1px solid rgba(255,255,255,0.15);
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              pointer-events: none;
              text-align: center;
            ">
              ${m.upazila} • ${m.name.length > 18 ? m.name.slice(0, 16) + '...' : m.name}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          html,
          className: 'custom-leaflet-pin',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const marker = L.marker([m.lat, m.lng], { icon: customIcon });

        // Rich Popup Content
        const popupContent = `
          <div style="font-family: inherit; font-size: 13px; line-height: 1.5; color: #1e293b; min-width: 220px; padding: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 11px; font-weight: 700; background: ${m.type === 'qawmi' ? '#ecfdf5' : m.type === 'hifz' ? '#fffbeb' : '#eff6ff'}; color: ${iconColor}; padding: 2px 8px; border-radius: 9999px;">
                ${m.typeLabel}
              </span>
              <span style="font-size: 11px; font-weight: 700; color: #f59e0b;">★ ${m.rating}</span>
            </div>
            <h4 style="font-size: 14px; font-weight: 800; margin: 0 0 4px 0; color: #0f172a;">${m.name}</h4>
            <p style="font-size: 12px; color: #64748b; margin: 0 0 8px 0;">📍 ${m.upazila}, ${m.district} (স্থাপিত: ${m.established})</p>
            
            <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 6px; margin-bottom: 10px; font-size: 12px;">
              <div>শিক্ষার্থী: <strong>${m.students} জন</strong></div>
              <div>পাসের হার: <strong style="color: #059669;">${m.passRate}%</strong></div>
            </div>

            <div style="display: flex; gap: 6px;">
              <a href="https://wa.me/${m.whatsapp}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি নূরহাব (NoorHub) থেকে ' + m.name + ' সম্পর্কে বিস্তারিত তথ্য ও ভর্তির বিষয়ে জানতে যোগাযোগ করছি।')}" target="_blank" style="flex: 1; text-align: center; background: #16a34a; color: white; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;">
                হোয়াটসঅ্যাপ
              </a>
              <a href="tel:${m.phone}" style="flex: 1; text-align: center; background: #0f172a; color: white; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;">
                কল করুন
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 280, closeButton: false });

        marker.on('click', () => {
          onSelectMadrasa(m);
        });

        markersGroup.addLayer(marker);

        if (isSelected) {
          marker.openPopup();
        }
      });
    });
  }, [madrasas, selectedMadrasa, mapLoaded, onSelectMadrasa]);

  // Map Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => {
    mapInstanceRef.current?.flyTo(BANGLADESH_CENTER, BANGLADESH_DEFAULT_ZOOM, { duration: 1 });
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 300);
  };

  return (
    <div className={`relative w-full overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen bg-slate-950' : 'h-[520px] rounded-2xl border border-slate-700/60 shadow-xl'}`}>
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="h-full w-full bg-slate-900" />

      {/* Floating Header Badges */}
      <div className="pointer-events-none absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-2">
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md border border-slate-700/60">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          <span>{isSatellite ? '🛰️ অফিশিয়াল স্যাটেলাইট ভিউ (Esri)' : '🗺️ অফিশিয়াল জিআইএস ম্যাপ (OpenStreetMap)'}</span>
        </div>

        <div className="pointer-events-auto rounded-xl bg-slate-900/85 px-3 py-1.5 text-xs font-bold text-emerald-400 shadow-lg backdrop-blur-md border border-slate-700/60">
          সক্রিয় হাব: {madrasas.length}টি
        </div>
      </div>

      {/* Right Map Action Controls */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
        {/* Layer Switcher */}
        {onToggleSatellite && (
          <button
            type="button"
            onClick={onToggleSatellite}
            title={isSatellite ? 'জিআইএস ম্যাপে ফিরুন' : 'স্যাটেলাইট ভিউ দেখুন'}
            className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-lg backdrop-blur-md border transition-all ${
              isSatellite
                ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400/50'
                : 'bg-slate-900/90 text-slate-200 border-slate-700/80 hover:bg-slate-800'
            }`}
          >
            <Layers className="h-4 w-4" />
          </button>
        )}

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'ফুলস্ক্রিন বন্ধ' : 'ফুলস্ক্রিন ভিউ'}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/90 text-slate-200 shadow-lg backdrop-blur-md border border-slate-700/80 hover:bg-slate-800"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

        {/* Reset View */}
        <button
          type="button"
          onClick={handleReset}
          title="সমগ্র বাংলাদেশ ভিউতে রিসেট করুন"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/90 text-slate-200 shadow-lg backdrop-blur-md border border-slate-700/80 hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* Zoom In & Out */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-md border border-slate-700/80">
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-8 w-9 items-center justify-center text-sm font-bold text-slate-200 hover:bg-slate-800 border-b border-slate-700/60"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-8 w-9 items-center justify-center text-base font-bold text-slate-200 hover:bg-slate-800"
          >
            -
          </button>
        </div>
      </div>

      {/* Compass Indicator Bottom Left */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-slate-300 shadow backdrop-blur-sm border border-slate-700/50">
        <Navigation className="h-3.5 w-3.5 text-red-400 rotate-[-45deg]" />
        <span>উত্তরমুখী (North)</span>
      </div>
    </div>
  );
}
