'use client';

import { OFFICIAL_MADRASAS, OfficialMadrasa, BANGLADESH_DIVISIONS } from '@/lib/geo-data';

export interface MadrasaProfile {
  id: string;
  name: string;
  type: 'qawmi' | 'alia' | 'hifz' | 'combined';
  typeLabel: string;
  divisionId: string;
  division: string;
  districtId: string;
  district: string;
  upazila: string;
  address: string;
  principal: string;
  phone: string;
  studentCount: number | string;
  classes: string[];
  registeredAt: string;
  isCustom: boolean;
}

export const DEFAULT_DEMO_MADRASA: MadrasaProfile = {
  id: 'DEMO-001',
  name: 'জামিয়া নূরুল উলুম',
  type: 'qawmi',
  typeLabel: 'কওমি ও হিফজ শাখা',
  divisionId: 'dhaka',
  division: 'ঢাকা',
  districtId: 'dhaka',
  district: 'ঢাকা',
  upazila: 'মিরপুর',
  address: 'মিরপুর-১, ঢাকা',
  principal: 'মাওলানা মুহাম্মদ আব্দুর রহমান',
  phone: '01711223344',
  studentCount: 347,
  classes: ['নূরানি ও নাজেরা', 'হিফজুল কুরআন', 'মিজান', 'কাফিয়া', 'দাওরায়ে হাদিস'],
  registeredAt: '2026-01-01',
  isCustom: false,
};

const STORAGE_KEY_ACTIVE = 'noorhub_active_madrasa_id';
const STORAGE_KEY_CUSTOM_LIST = 'noorhub_custom_registered_madrasas';

/**
 * Get all registered custom madrasas from local storage
 */
export function getCustomMadrasas(): MadrasaProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_LIST);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse custom madrasas', err);
    return [];
  }
}

/**
 * Save a newly registered madrasa
 */
export function saveRegisteredMadrasa(data: Omit<MadrasaProfile, 'isCustom'>): MadrasaProfile {
  const newProfile: MadrasaProfile = {
    ...data,
    isCustom: true,
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getCustomMadrasas();
      const updated = [newProfile, ...existing.filter((m) => m.id !== newProfile.id)];
      localStorage.setItem(STORAGE_KEY_CUSTOM_LIST, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEY_ACTIVE, newProfile.id);
      window.dispatchEvent(new Event('noorhub_madrasa_changed'));
    } catch (err) {
      console.error('Failed to save madrasa', err);
    }
  }

  return newProfile;
}

/**
 * Get the currently active madrasa profile
 */
export function getActiveMadrasa(): MadrasaProfile {
  if (typeof window === 'undefined') return DEFAULT_DEMO_MADRASA;
  try {
    const activeId = localStorage.getItem(STORAGE_KEY_ACTIVE);
    if (!activeId || activeId === DEFAULT_DEMO_MADRASA.id) {
      return DEFAULT_DEMO_MADRASA;
    }
    const customList = getCustomMadrasas();
    const match = customList.find((m) => m.id === activeId);
    return match || DEFAULT_DEMO_MADRASA;
  } catch {
    return DEFAULT_DEMO_MADRASA;
  }
}

/**
 * Switch active madrasa
 */
export function setActiveMadrasa(id: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_ACTIVE, id);
    window.dispatchEvent(new Event('noorhub_madrasa_changed'));
  }
}

/**
 * Get combined list of all madrasas (Official BBS Geo-Data + Newly Registered by User)
 * This powers the interactive GIS Map & Public Directory dynamically!
 */
export function getCombinedMapMadrasas(): OfficialMadrasa[] {
  const customList = getCustomMadrasas();

  const customAsOfficial: OfficialMadrasa[] = customList.map((m, idx) => {
    let lat = 23.8103;
    let lng = 90.4125;

    const div = BANGLADESH_DIVISIONS.find((d) => d.id === m.divisionId);
    if (div) {
      lat = div.lat;
      lng = div.lng;
      const dist = div.districts.find((dst) => dst.id === m.districtId);
      if (dist) {
        lat = dist.lat;
        lng = dist.lng;
        const upz = dist.upazilas.find(
          (u) => u.nameBn === m.upazila || m.upazila.includes(u.nameBn) || u.nameBn.includes(m.upazila)
        );
        if (upz && upz.lat && upz.lng) {
          lat = upz.lat;
          lng = upz.lng;
        } else {
          // slight offset so multiple pins don't overlap completely
          lat += ((idx % 5) - 2) * 0.008;
          lng += (((idx + 1) % 5) - 2) * 0.008;
        }
      }
    }

    const studentsNum =
      typeof m.studentCount === 'number'
        ? m.studentCount
        : m.studentCount === '500+'
        ? 550
        : m.studentCount === '300-500'
        ? 380
        : m.studentCount === '100-300'
        ? 210
        : 85;

    return {
      id: m.id,
      name: m.name,
      type: m.type === 'alia' ? 'alia' : m.type === 'hifz' ? 'hifz' : 'qawmi',
      typeLabel: m.type === 'alia' ? 'আলিয়া' : m.type === 'hifz' ? 'হিফজ' : 'কওমি',
      students: studentsNum,
      passRate: 98,
      rating: 5.0,
      isVerified: true,
      divisionId: m.divisionId || 'dhaka',
      districtId: m.districtId || 'dhaka',
      district: m.district || 'ঢাকা',
      upazila: m.upazila || 'সদর',
      principal: m.principal,
      phone: m.phone,
      whatsapp: `88${m.phone.replace(/[^0-9]/g, '')}`,
      lat,
      lng,
      address: m.address || `${m.upazila}, ${m.district}`,
      established: 2024,
      facilities: m.classes,
    };
  });

  return [...customAsOfficial, ...OFFICIAL_MADRASAS];
}
