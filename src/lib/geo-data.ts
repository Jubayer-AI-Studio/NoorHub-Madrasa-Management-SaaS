/**
 * Bangladesh Geo Data
 * বিভাগ → জেলা → উপজেলা
 * Interactive Map-এর জন্য ব্যবহৃত হবে
 */

export interface Division {
  id: string;
  name: string;
  nameBn: string;
  lat: number;
  lng: number;
  districts: District[];
}

export interface District {
  id: string;
  name: string;
  nameBn: string;
  divisionId: string;
  lat: number;
  lng: number;
  upazilas: Upazila[];
}

export interface Upazila {
  id: string;
  name: string;
  nameBn: string;
  districtId: string;
  lat: number;
  lng: number;
}

export const BANGLADESH_DIVISIONS: Division[] = [
  {
    id: 'dhaka',
    name: 'Dhaka',
    nameBn: 'ঢাকা',
    lat: 23.8103,
    lng: 90.4125,
    districts: [
      {
        id: 'dhaka-district',
        name: 'Dhaka',
        nameBn: 'ঢাকা',
        divisionId: 'dhaka',
        lat: 23.8103,
        lng: 90.4125,
        upazilas: [
          { id: 'dhanmondi', name: 'Dhanmondi', nameBn: 'ধানমন্ডি', districtId: 'dhaka-district', lat: 23.7461, lng: 90.3742 },
          { id: 'mirpur', name: 'Mirpur', nameBn: 'মিরপুর', districtId: 'dhaka-district', lat: 23.8223, lng: 90.3654 },
          { id: 'uttara', name: 'Uttara', nameBn: 'উত্তরা', districtId: 'dhaka-district', lat: 23.8759, lng: 90.3795 },
          { id: 'lalbagh', name: 'Lalbagh', nameBn: 'লালবাগ', districtId: 'dhaka-district', lat: 23.7194, lng: 90.3880 },
        ],
      },
      {
        id: 'gazipur',
        name: 'Gazipur',
        nameBn: 'গাজীপুর',
        divisionId: 'dhaka',
        lat: 23.9999,
        lng: 90.4203,
        upazilas: [
          { id: 'gazipur-sadar', name: 'Gazipur Sadar', nameBn: 'গাজীপুর সদর', districtId: 'gazipur', lat: 23.9999, lng: 90.4203 },
          { id: 'kaliakair', name: 'Kaliakair', nameBn: 'কালিয়াকৈর', districtId: 'gazipur', lat: 23.9987, lng: 90.2587 },
          { id: 'kapasia', name: 'Kapasia', nameBn: 'কাপাসিয়া', districtId: 'gazipur', lat: 24.0914, lng: 90.5833 },
        ],
      },
      {
        id: 'narayanganj',
        name: 'Narayanganj',
        nameBn: 'নারায়ণগঞ্জ',
        divisionId: 'dhaka',
        lat: 23.6238,
        lng: 90.5000,
        upazilas: [
          { id: 'narayanganj-sadar', name: 'Narayanganj Sadar', nameBn: 'নারায়ণগঞ্জ সদর', districtId: 'narayanganj', lat: 23.6238, lng: 90.5000 },
          { id: 'rupganj', name: 'Rupganj', nameBn: 'রূপগঞ্জ', districtId: 'narayanganj', lat: 23.7334, lng: 90.5456 },
        ],
      },
    ],
  },
  {
    id: 'chittagong',
    name: 'Chittagong',
    nameBn: 'চট্টগ্রাম',
    lat: 22.3569,
    lng: 91.7832,
    districts: [
      {
        id: 'chittagong-district',
        name: 'Chittagong',
        nameBn: 'চট্টগ্রাম',
        divisionId: 'chittagong',
        lat: 22.3569,
        lng: 91.7832,
        upazilas: [
          { id: 'kotwali', name: 'Kotwali', nameBn: 'কোতোয়ালি', districtId: 'chittagong-district', lat: 22.3394, lng: 91.8291 },
          { id: 'hathazari', name: 'Hathazari', nameBn: 'হাটহাজারী', districtId: 'chittagong-district', lat: 22.5078, lng: 91.8024 },
          { id: 'rangunia', name: 'Rangunia', nameBn: 'রাঙ্গুনিয়া', districtId: 'chittagong-district', lat: 22.4714, lng: 92.0843 },
        ],
      },
      {
        id: 'comilla',
        name: 'Comilla',
        nameBn: 'কুমিল্লা',
        divisionId: 'chittagong',
        lat: 23.4607,
        lng: 91.1809,
        upazilas: [
          { id: 'comilla-sadar', name: 'Comilla Sadar', nameBn: 'কুমিল্লা সদর', districtId: 'comilla', lat: 23.4607, lng: 91.1809 },
          { id: 'debidwar', name: 'Debidwar', nameBn: 'দেবিদ্বার', districtId: 'comilla', lat: 23.6301, lng: 90.9789 },
        ],
      },
    ],
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    nameBn: 'রাজশাহী',
    lat: 24.3745,
    lng: 88.6042,
    districts: [
      {
        id: 'rajshahi-district',
        name: 'Rajshahi',
        nameBn: 'রাজশাহী',
        divisionId: 'rajshahi',
        lat: 24.3745,
        lng: 88.6042,
        upazilas: [
          { id: 'boalia', name: 'Boalia', nameBn: 'বোয়ালিয়া', districtId: 'rajshahi-district', lat: 24.3745, lng: 88.6042 },
          { id: 'paba', name: 'Paba', nameBn: 'পবা', districtId: 'rajshahi-district', lat: 24.4167, lng: 88.5833 },
        ],
      },
      {
        id: 'chapai',
        name: 'Chapai Nawabganj',
        nameBn: 'চাঁপাইনবাবগঞ্জ',
        divisionId: 'rajshahi',
        lat: 24.5913,
        lng: 88.2725,
        upazilas: [
          { id: 'chapai-sadar', name: 'Chapai Sadar', nameBn: 'চাঁপাইনবাবগঞ্জ সদর', districtId: 'chapai', lat: 24.5913, lng: 88.2725 },
          { id: 'shibganj', name: 'Shibganj', nameBn: 'শিবগঞ্জ', districtId: 'chapai', lat: 24.6833, lng: 88.1500 },
        ],
      },
    ],
  },
  {
    id: 'khulna',
    name: 'Khulna',
    nameBn: 'খুলনা',
    lat: 22.8456,
    lng: 89.5403,
    districts: [
      {
        id: 'khulna-district',
        name: 'Khulna',
        nameBn: 'খুলনা',
        divisionId: 'khulna',
        lat: 22.8456,
        lng: 89.5403,
        upazilas: [
          { id: 'khulna-sadar', name: 'Khulna Sadar', nameBn: 'খুলনা সদর', districtId: 'khulna-district', lat: 22.8456, lng: 89.5403 },
          { id: 'dumuria', name: 'Dumuria', nameBn: 'ডুমুরিয়া', districtId: 'khulna-district', lat: 22.7850, lng: 89.4150 },
        ],
      },
    ],
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    nameBn: 'সিলেট',
    lat: 24.8949,
    lng: 91.8687,
    districts: [
      {
        id: 'sylhet-district',
        name: 'Sylhet',
        nameBn: 'সিলেট',
        divisionId: 'sylhet',
        lat: 24.8949,
        lng: 91.8687,
        upazilas: [
          { id: 'sylhet-sadar', name: 'Sylhet Sadar', nameBn: 'সিলেট সদর', districtId: 'sylhet-district', lat: 24.8949, lng: 91.8687 },
          { id: 'beanibazar', name: 'Beanibazar', nameBn: 'বিয়ানীবাজার', districtId: 'sylhet-district', lat: 24.6500, lng: 92.1167 },
        ],
      },
    ],
  },
  {
    id: 'barisal',
    name: 'Barisal',
    nameBn: 'বরিশাল',
    lat: 22.7010,
    lng: 90.3535,
    districts: [
      {
        id: 'barisal-district',
        name: 'Barisal',
        nameBn: 'বরিশাল',
        divisionId: 'barisal',
        lat: 22.7010,
        lng: 90.3535,
        upazilas: [
          { id: 'barisal-sadar', name: 'Barisal Sadar', nameBn: 'বরিশাল সদর', districtId: 'barisal-district', lat: 22.7010, lng: 90.3535 },
          { id: 'bakerganj', name: 'Bakerganj', nameBn: 'বাকেরগঞ্জ', districtId: 'barisal-district', lat: 22.5833, lng: 90.2667 },
        ],
      },
    ],
  },
  {
    id: 'rangpur',
    name: 'Rangpur',
    nameBn: 'রংপুর',
    lat: 25.7439,
    lng: 89.2752,
    districts: [
      {
        id: 'rangpur-district',
        name: 'Rangpur',
        nameBn: 'রংপুর',
        divisionId: 'rangpur',
        lat: 25.7439,
        lng: 89.2752,
        upazilas: [
          { id: 'rangpur-sadar', name: 'Rangpur Sadar', nameBn: 'রংপুর সদর', districtId: 'rangpur-district', lat: 25.7439, lng: 89.2752 },
          { id: 'pirganj', name: 'Pirganj', nameBn: 'পীরগঞ্জ', districtId: 'rangpur-district', lat: 25.8500, lng: 88.9167 },
        ],
      },
    ],
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    lat: 24.7471,
    lng: 90.4203,
    districts: [
      {
        id: 'mymensingh-district',
        name: 'Mymensingh',
        nameBn: 'ময়মনসিংহ',
        divisionId: 'mymensingh',
        lat: 24.7471,
        lng: 90.4203,
        upazilas: [
          { id: 'mymensingh-sadar', name: 'Mymensingh Sadar', nameBn: 'ময়মনসিংহ সদর', districtId: 'mymensingh-district', lat: 24.7471, lng: 90.4203 },
          { id: 'trishal', name: 'Trishal', nameBn: 'ত্রিশাল', districtId: 'mymensingh-district', lat: 24.6000, lng: 90.3667 },
        ],
      },
    ],
  },
];

export const BANGLADESH_CENTER: [number, number] = [23.6850, 90.3563];
export const BANGLADESH_ZOOM = 7;
