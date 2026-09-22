'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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

      L.control
        .attribution({ position: 'bottomright', prefix: false })
        .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | নূরহাব GIS')
        .addTo(map);

      // Primary High-Contrast Street Tile Layer
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

      // Invalidate size on mobile load
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
      setTimeout(() => {
        map.invalidateSize();
      }, 800);
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
        tileLayerRef.current = L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          { subdomains: 'abcd', maxZoom: 19 }
        ).addTo(map);
      }
    });
  }, [isSatellite, mapLoaded]);

  // Handle camera flyTo based on current hierarchical level
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (selectedMadrasa) {
      map.flyTo([selectedMadrasa.lat, selectedMadrasa.lng], 15, { duration: 1.2 });
    } else if (selectedUpazila) {
      map.flyTo([selectedUpazila.lat, selectedUpazila.lng], selectedUpazila.zoom || 13, { duration: 1.2 });
    } else if (selectedDistrict) {
      map.flyTo([selectedDistrict.lat, selectedDistrict.lng], selectedDistrict.zoom || 12, { duration: 1.2 });
    } else if (selectedDivision) {
      map.flyTo([selectedDivision.lat, selectedDivision.lng], selectedDivision.zoom || 9.5, { duration: 1.2 });
    } else {
      map.flyTo(BANGLADESH_CENTER, BANGLADESH_DEFAULT_ZOOM, { duration: 1.0 });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 400);
  }, [currentLevel, selectedDivision, selectedDistrict, selectedUpazila, selectedMadrasa, mapLoaded]);

  // Render clickable markers and badges depending on current level
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !markersGroupRef.current) return;

    import('leaflet').then((L) => {
      const markersGroup = markersGroupRef.current;
      if (!markersGroup || !mapInstanceRef.current) return;

      markersGroup.clearLayers();

      // LEVEL 1: ALL BANGLADESH VIEW -> Render Division Clickable Badges on the Map
      if (currentLevel === 'bangladesh') {
        divisions.forEach((div) => {
          const html = `
            <div class="map-division-badge" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              transform: translate(-50%, -50%);
            ">
              <div style="
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: #ffffff;
                padding: 6px 12px;
                border-radius: 9999px;
                box-shadow: 0 4px 14px rgba(0,0,0,0.35);
                border: 2px solid #ffffff;
                display: flex;
                align-items: center;
                gap: 6px;
                font-weight: 800;
                font-size: 12px;
                white-space: nowrap;
              ">
                <span>🏛️ ${div.nameBn} বিভাগ</span>
                <span style="background: rgba(255,255,255,0.25); padding: 1px 6px; border-radius: 8px; font-size: 11px;">
                  ${div.districts.length} জেলা
                </span>
              </div>
              <div style="
                margin-top: 3px;
                background: rgba(15, 23, 42, 0.9);
                color: #facc15;
                font-size: 10px;
                font-weight: 700;
                padding: 1px 8px;
                border-radius: 6px;
                border: 1px solid rgba(255,255,255,0.15);
              ">
                ★ ${div.rating} • ${div.passRate}% পাস
              </div>
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

      // LEVEL 2: DIVISION VIEW -> Render District Clickable Badges on the Map
      else if (currentLevel === 'division' && selectedDivision) {
        selectedDivision.districts.forEach((dist) => {
          const html = `
            <div class="map-district-badge" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              transform: translate(-50%, -50%);
            ">
              <div style="
                background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
                color: #ffffff;
                padding: 5px 11px;
                border-radius: 9999px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                border: 2px solid #ffffff;
                display: flex;
                align-items: center;
                gap: 5px;
                font-weight: 800;
                font-size: 12px;
                white-space: nowrap;
              ">
                <span>📍 ${dist.nameBn}</span>
                <span style="background: rgba(255,255,255,0.25); padding: 1px 5px; border-radius: 6px; font-size: 10px;">
                  ${dist.upazilas.length} উপজেলা
                </span>
              </div>
              <div style="
                margin-top: 2px;
                background: rgba(15, 23, 42, 0.9);
                color: #38bdf8;
                font-size: 10px;
                font-weight: 700;
                padding: 1px 6px;
                border-radius: 6px;
                border: 1px solid rgba(255,255,255,0.15);
              ">
                ★ ${dist.rating} • ${dist.totalMadrasas}টি মাদরাসা
              </div>
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

      // LEVEL 3 & 4: DISTRICT OR UPAZILA VIEW -> Render Upazilas & Madrasas
      else if (selectedDistrict) {
        // Render Upazila Badges on Map
        selectedDistrict.upazilas.forEach((up) => {
          const isSelectedUp = selectedUpazila?.id === up.id;
          const html = `
            <div class="map-upazila-badge" style="
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              transform: translate(-50%, -50%);
            ">
              <div style="
                background: ${isSelectedUp ? '#d97706' : '#10b981'};
                color: #ffffff;
                padding: 4px 10px;
                border-radius: 9999px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.35);
                border: 2px solid #ffffff;
                display: flex;
                align-items: center;
                gap: 4px;
                font-weight: 800;
                font-size: 11px;
                white-space: nowrap;
              ">
                <span>🕌 ${up.nameBn}</span>
                <span style="background: rgba(0,0,0,0.25); padding: 1px 5px; border-radius: 6px; font-size: 10px;">
                  ★ ${up.rating}
                </span>
              </div>
              <div style="
                margin-top: 2px;
                background: rgba(15, 23, 42, 0.9);
                color: #ffffff;
                font-size: 9px;
                font-weight: 600;
                padding: 1px 6px;
                border-radius: 6px;
              ">
                পাস: ${up.passRate}% • ${up.madrasasCount}টি মাদরাসা
              </div>
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

        // Also render specific Madrasa Radar Pins
        madrasas.forEach((m) => {
          const isSelected = selectedMadrasa?.id === m.id;
          const iconColor = m.type === 'qawmi' ? '#059669' : m.type === 'hifz' ? '#d97706' : '#2563eb';
          const pulseColor = m.type === 'qawmi' ? 'rgba(16, 185, 129, 0.45)' : m.type === 'hifz' ? 'rgba(245, 158, 11, 0.45)' : 'rgba(59, 130, 246, 0.45)';

          const html = `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; transform: translate(-50%, -50%);">
              <div style="
                position: absolute;
                width: ${isSelected ? '44px' : '32px'};
                height: ${isSelected ? '44px' : '32px'};
                border-radius: 50%;
                background: ${pulseColor};
                animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
              "></div>
              <div style="
                position: relative;
                width: ${isSelected ? '26px' : '18px'};
                height: ${isSelected ? '26px' : '18px'};
                background: ${iconColor};
                border: 3px solid #ffffff;
                border-radius: 50%;
                box-shadow: 0 4px 10px rgba(0,0,0,0.35);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 10px;
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
            <div style="font-family: inherit; font-size: 13px; line-height: 1.5; color: #1e293b; min-width: 220px; padding: 4px;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                <span style="font-size: 11px; font-weight: 700; background: #ecfdf5; color: ${iconColor}; padding: 2px 8px; border-radius: 9999px;">
                  ${m.typeLabel}
                </span>
                <span style="font-size: 11px; font-weight: 700; color: #f59e0b;">★ ${m.rating}</span>
              </div>
              <h4 style="font-size: 14px; font-weight: 800; margin: 0 0 4px 0; color: #0f172a;">${m.name}</h4>
              <p style="font-size: 12px; color: #64748b; margin: 0 0 8px 0;">📍 ${m.upazila}, ${m.district}</p>
              
              <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 6px; margin-bottom: 10px; font-size: 12px;">
                <div>শিক্ষার্থী: <strong>${m.students} জন</strong></div>
                <div>পাসের হার: <strong style="color: #059669;">${m.passRate}%</strong></div>
              </div>

              <div style="display: flex; gap: 6px;">
                <a href="https://wa.me/${m.whatsapp}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি নূরহাব প্ল্যাটফর্ম থেকে ' + m.name + ' সম্পর্কে বিস্তারিত তথ্য ও ভর্তির বিষয়ে জানতে যোগাযোগ করছি।')}" target="_blank" style="flex: 1; text-align: center; background: #16a34a; color: white; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none;">
                  হোয়াটসঅ্যাপ
                </a>
                <a href="tel:${m.phone}" style="flex: 1; text-align: center; background: #0f172a; color: white; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; text-decoration: none;">
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
          : 'noorhub-gis-map border border-slate-700/80 shadow-2xl'
      }`}
    >
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="h-full w-full bg-slate-900" />

      {/* Top Left Level Indicator Badge */}
      <div className="pointer-events-none absolute top-3 left-3 z-[1000] flex flex-col gap-1.5">
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md border border-slate-700/60">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          <span>
            {currentLevel === 'bangladesh' && '🇧🇩 সমগ্র বাংলাদেশ (বিভাগে ট্যাপ করে ঢুকুন)'}
            {currentLevel === 'division' && `🏛️ ${selectedDivision?.nameBn} বিভাগ (জেলায় ট্যাপ করুন)`}
            {currentLevel === 'district' && `📍 ${selectedDistrict?.nameBn} জেলা (উপজেলায় ট্যাপ করুন)`}
            {currentLevel === 'upazila' && `🕌 ${selectedUpazila?.nameBn} উপজেলা`}
          </span>
        </div>

        {currentLevel !== 'bangladesh' && onResetView && (
          <button
            type="button"
            onClick={onResetView}
            className="pointer-events-auto w-fit rounded-lg bg-emerald-600/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-md hover:bg-emerald-700 border border-emerald-400/50 flex items-center gap-1 transition-all"
          >
            <RotateCcw className="h-3 w-3" />
            সমগ্র বাংলাদেশে ফিরুন
          </button>
        )}
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
