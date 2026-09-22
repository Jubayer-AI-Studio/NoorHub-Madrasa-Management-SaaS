'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, LayerGroup } from 'leaflet';
import {
  Division,
  District,
  Upazila,
  OfficialMadrasa,
  BANGLADESH_CENTER,
  BANGLADESH_DEFAULT_ZOOM,
} from '@/lib/geo-data';
import { Layers, Maximize2, Minimize2, Navigation, RotateCcw } from 'lucide-react';

interface OfficialGISMapProps {
  currentLevel: 'bangladesh' | 'division' | 'district' | 'upazila';
  divisions: Division[];
  selectedDivision: Division | null;
  selectedDistrict: District | null;
  selectedUpazila: Upazila | null;
  madrasas: OfficialMadrasa[];
  selectedMadrasa: OfficialMadrasa | null;
  onSelectDivision: (divId: string) => void;
  onSelectDistrict: (distId: string) => void;
  onSelectUpazila: (upId: string) => void;
  onSelectMadrasa: (m: OfficialMadrasa) => void;
  isSatellite?: boolean;
  onToggleSatellite?: () => void;
  onResetView?: () => void;
}

export default function OfficialGISMap({
  currentLevel,
  divisions,
  selectedDivision,
  selectedDistrict,
  selectedUpazila,
  madrasas,
  selectedMadrasa,
  onSelectDivision,
  onSelectDistrict,
  onSelectUpazila,
  onSelectMadrasa,
  isSatellite = false,
  onToggleSatellite,
  onResetView,
}: OfficialGISMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersGroupRef = useRef<LayerGroup | null>(null);
  const tileLayerRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize Map with 100% Real, Watermark-Free OpenStreetMap
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

      L.control
        .attribution({ position: 'bottomright', prefix: false })
        .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | নূরহাব GIS')
        .addTo(map);

      // 100% Real, Clean OpenStreetMap Standard Tiles (No Watermark, Bengali Labels)
      const streetTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      });
      streetTiles.addTo(map);
      tileLayerRef.current = streetTiles;

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;

      mapInstanceRef.current = map;
      setMapLoaded(true);

      // Trigger size invalidation to prevent blank/grey tiles on mobile
      setTimeout(() => map.invalidateSize(), 150);
      setTimeout(() => map.invalidateSize(), 600);
    }

    init();

    const handleResize = () => {
      mapInstanceRef.current?.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Satellite switch (100% Real Esri Satellite Imagery, No Watermark)
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
      }

      if (isSatellite) {
        // High-resolution real satellite photos from orbit
        tileLayerRef.current = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { maxZoom: 18, attribution: '&copy; Esri World Imagery' }
        ).addTo(map);
      } else {
        // Real OpenStreetMap Standard
        tileLayerRef.current = L.tileLayer(
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }
        ).addTo(map);
      }
    });
  }, [isSatellite, mapLoaded]);

  // Handle camera flyTo based on current hierarchical level
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (selectedMadrasa) {
      map.flyTo([selectedMadrasa.lat, selectedMadrasa.lng], 15, { duration: 1.1 });
    } else if (selectedUpazila) {
      map.flyTo([selectedUpazila.lat, selectedUpazila.lng], selectedUpazila.zoom || 13, { duration: 1.1 });
    } else if (selectedDistrict) {
      map.flyTo([selectedDistrict.lat, selectedDistrict.lng], selectedDistrict.zoom || 11.5, { duration: 1.1 });
    } else if (selectedDivision) {
      map.flyTo([selectedDivision.lat, selectedDivision.lng], selectedDivision.zoom || 9, { duration: 1.1 });
    } else {
      map.flyTo(BANGLADESH_CENTER, BANGLADESH_DEFAULT_ZOOM, { duration: 1.0 });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [currentLevel, selectedDivision, selectedDistrict, selectedUpazila, selectedMadrasa, mapLoaded]);

  // Render sleek, compact, non-overlapping clickable badges on the map
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !markersGroupRef.current) return;

    import('leaflet').then((L) => {
      const markersGroup = markersGroupRef.current;
      if (!markersGroup || !mapInstanceRef.current) return;

      markersGroup.clearLayers();

      // LEVEL 1: ALL BANGLADESH VIEW -> Compact, glowing Division Radar Pins
      if (currentLevel === 'bangladesh') {
        divisions.forEach((div) => {
          const html = `
            <div class="map-division-badge" style="
              display: flex;
              align-items: center;
              gap: 4px;
              cursor: pointer;
              transform: translate(-50%, -50%);
              background: #065f46;
              color: #ffffff;
              padding: 4px 9px;
              border-radius: 9999px;
              box-shadow: 0 3px 10px rgba(0,0,0,0.35);
              border: 1.5px solid #ffffff;
              font-weight: 800;
              font-size: 11px;
              white-space: nowrap;
            ">
              <span>🏛️ ${div.nameBn}</span>
              <span style="background: rgba(0,0,0,0.25); color: #facc15; padding: 1px 4px; border-radius: 4px; font-size: 10px;">
                ★ ${div.rating}
              </span>
            </div>
          `;

          const icon = L.divIcon({
            html,
            className: 'noorhub-div-icon',
            iconSize: [0, 0],
          });

          const marker = L.marker([div.lat, div.lng], { icon });
          marker.on('click', () => {
            onSelectDivision(div.id);
          });
          markersGroup.addLayer(marker);
        });
      }

      // LEVEL 2: DIVISION VIEW -> Sleek District Clickable Badges on the Map
      else if (currentLevel === 'division' && selectedDivision) {
        selectedDivision.districts.forEach((dist) => {
          const html = `
            <div class="map-district-badge" style="
              display: flex;
              align-items: center;
              gap: 4px;
              cursor: pointer;
              transform: translate(-50%, -50%);
              background: #0284c7;
              color: #ffffff;
              padding: 4px 8px;
              border-radius: 9999px;
              box-shadow: 0 3px 10px rgba(0,0,0,0.3);
              border: 1.5px solid #ffffff;
              font-weight: 800;
              font-size: 11px;
              white-space: nowrap;
            ">
              <span>📍 ${dist.nameBn}</span>
              <span style="background: rgba(0,0,0,0.25); color: #e0f2fe; padding: 1px 4px; border-radius: 4px; font-size: 9px;">
                ${dist.upazilas.length}টি
              </span>
            </div>
          `;

          const icon = L.divIcon({
            html,
            className: 'noorhub-dist-icon',
            iconSize: [0, 0],
          });

          const marker = L.marker([dist.lat, dist.lng], { icon });
          marker.on('click', () => {
            onSelectDistrict(dist.id);
          });
          markersGroup.addLayer(marker);
        });
      }

      // LEVEL 3 & 4: DISTRICT OR UPAZILA VIEW -> Sleek Upazila Badges & Madrasa Pins
      else if (selectedDistrict) {
        // Upazila Badges
        selectedDistrict.upazilas.forEach((up) => {
          const isSelectedUp = selectedUpazila?.id === up.id;
          const html = `
            <div class="map-upazila-badge" style="
              display: flex;
              align-items: center;
              gap: 3px;
              cursor: pointer;
              transform: translate(-50%, -50%);
              background: ${isSelectedUp ? '#d97706' : '#059669'};
              color: #ffffff;
              padding: 3px 8px;
              border-radius: 9999px;
              box-shadow: 0 3px 10px rgba(0,0,0,0.3);
              border: 1.5px solid #ffffff;
              font-weight: 800;
              font-size: 10px;
              white-space: nowrap;
            ">
              <span>🕌 ${up.nameBn}</span>
              <span style="background: rgba(0,0,0,0.25); padding: 0.5px 4px; border-radius: 4px; font-size: 9px; color: #fef08a;">
                ★ ${up.rating}
              </span>
            </div>
          `;

          const icon = L.divIcon({
            html,
            className: 'noorhub-up-icon',
            iconSize: [0, 0],
          });

          const marker = L.marker([up.lat, up.lng], { icon });
          marker.on('click', () => {
            onSelectUpazila(up.id);
          });
          markersGroup.addLayer(marker);
        });

        // Madrasa Radar Pins
        madrasas.forEach((m) => {
          const isSelected = selectedMadrasa?.id === m.id;
          const iconColor = m.type === 'qawmi' ? '#059669' : m.type === 'hifz' ? '#d97706' : '#2563eb';
          const pulseColor = m.type === 'qawmi' ? 'rgba(16, 185, 129, 0.45)' : m.type === 'hifz' ? 'rgba(245, 158, 11, 0.45)' : 'rgba(59, 130, 246, 0.45)';

          const html = `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; transform: translate(-50%, -50%);">
              <div style="
                position: absolute;
                width: ${isSelected ? '38px' : '28px'};
                height: ${isSelected ? '38px' : '28px'};
                border-radius: 50%;
                background: ${pulseColor};
                animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
              "></div>
              <div style="
                position: relative;
                width: ${isSelected ? '22px' : '16px'};
                height: ${isSelected ? '22px' : '16px'};
                background: ${iconColor};
                border: 2px solid #ffffff;
                border-radius: 50%;
                box-shadow: 0 3px 8px rgba(0,0,0,0.35);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 9px;
                font-weight: bold;
              ">
                ${isSelected ? '★' : '•'}
              </div>
            </div>
          `;

          const customIcon = L.divIcon({
            html,
            className: 'custom-leaflet-pin',
            iconSize: [0, 0],
          });

          const marker = L.marker([m.lat, m.lng], { icon: customIcon });

          const popupContent = `
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4; color: #1e293b; min-width: 200px; padding: 2px;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
                <span style="font-size: 10px; font-weight: 700; background: #ecfdf5; color: ${iconColor}; padding: 1px 6px; border-radius: 9999px;">
                  ${m.typeLabel}
                </span>
                <span style="font-size: 11px; font-weight: 700; color: #f59e0b;">★ ${m.rating}</span>
              </div>
              <h4 style="font-size: 13px; font-weight: 800; margin: 0 0 2px 0; color: #0f172a;">${m.name}</h4>
              <p style="font-size: 11px; color: #64748b; margin: 0 0 6px 0;">📍 ${m.upazila}, ${m.district}</p>
              
              <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 4px 8px; border-radius: 6px; margin-bottom: 8px; font-size: 11px;">
                <div>শিক্ষার্থী: <strong>${m.students} জন</strong></div>
                <div>পাসের হার: <strong style="color: #059669;">${m.passRate}%</strong></div>
              </div>

              <div style="display: flex; gap: 4px;">
                <a href="https://wa.me/${m.whatsapp}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি নূরহাব প্ল্যাটফর্ম থেকে ' + m.name + ' সম্পর্কে জানতে যোগাযোগ করছি।')}" target="_blank" style="flex: 1; text-align: center; background: #16a34a; color: white; padding: 5px 6px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none;">
                  হোয়াটসঅ্যাপ
                </a>
                <a href="tel:${m.phone}" style="flex: 1; text-align: center; background: #0f172a; color: white; padding: 5px 6px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none;">
                  কল
                </a>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, { maxWidth: 260, closeButton: false });
          marker.on('click', () => {
            onSelectMadrasa(m);
          });
          markersGroup.addLayer(marker);

          if (isSelected) {
            marker.openPopup();
          }
        });
      }
    });
  }, [
    currentLevel,
    divisions,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    madrasas,
    selectedMadrasa,
    mapLoaded,
    onSelectDivision,
    onSelectDistrict,
    onSelectUpazila,
    onSelectMadrasa,
  ]);

  // Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 300);
  };

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen w-screen bg-slate-950'
          : 'noorhub-gis-map border border-slate-300 shadow-md'
      }`}
    >
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="h-full w-full bg-slate-100" />

      {/* Top Left Level Indicator Badge */}
      <div className="pointer-events-none absolute top-2.5 left-2.5 z-[1000] flex flex-col gap-1">
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg bg-slate-900/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md border border-slate-700/60">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span>
            {currentLevel === 'bangladesh' && '🇧🇩 বাংলাদেশ মানচিত্র (বিভাগে ট্যাপ করুন)'}
            {currentLevel === 'division' && `🏛️ ${selectedDivision?.nameBn} (জেলায় ট্যাপ করুন)`}
            {currentLevel === 'district' && `📍 ${selectedDistrict?.nameBn} (উপজেলায় ট্যাপ করুন)`}
            {currentLevel === 'upazila' && `🕌 ${selectedUpazila?.nameBn}`}
          </span>
        </div>

        {currentLevel !== 'bangladesh' && onResetView && (
          <button
            type="button"
            onClick={onResetView}
            className="pointer-events-auto w-fit rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-sm hover:bg-emerald-700 flex items-center gap-1 transition-all"
          >
            <RotateCcw className="h-2.5 w-2.5" />
            বাংলাদেশ ভিউ
          </button>
        )}
      </div>

      {/* Right Map Action Controls */}
      <div className="absolute top-2.5 right-2.5 z-[1000] flex flex-col gap-1.5">
        {/* Layer Switcher */}
        {onToggleSatellite && (
          <button
            type="button"
            onClick={onToggleSatellite}
            title={isSatellite ? 'জিআইএস ম্যাপে ফিরুন' : 'স্যাটেলাইট ভিউ দেখুন'}
            className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-md backdrop-blur-md border transition-all ${
              isSatellite
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-white/95 text-slate-700 border-slate-300 hover:bg-slate-100'
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
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-700 shadow-md backdrop-blur-md border border-slate-300 hover:bg-slate-100"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

        {/* Zoom In & Out */}
        <div className="flex flex-col overflow-hidden rounded-lg bg-white/95 shadow-md backdrop-blur-md border border-slate-300">
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-7 w-8 items-center justify-center text-xs font-black text-slate-700 hover:bg-slate-100 border-b border-slate-200"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-7 w-8 items-center justify-center text-sm font-black text-slate-700 hover:bg-slate-100"
          >
            -
          </button>
        </div>
      </div>

      {/* Compass Indicator Bottom Left */}
      <div className="pointer-events-none absolute bottom-2 left-2 z-[1000] flex items-center gap-1 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200">
        <Navigation className="h-3 w-3 text-red-500 rotate-[-45deg]" />
        <span>উত্তর (North)</span>
      </div>
    </div>
  );
}
