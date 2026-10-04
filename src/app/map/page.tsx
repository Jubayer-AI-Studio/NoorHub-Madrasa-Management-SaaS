import BangladeshMapPage from '@/app/dashboard/map/page';

export const metadata = {
  title: 'ইসলামিক শিক্ষা মানচিত্র — নূরহাব',
  description: 'সমগ্র বাংলাদেশের মাদ্রাসা সমূহের ইন্টারেক্টিভ ডিজিটাল মানচিত্র',
};

export default function MapStandalonePage() {
  return <BangladeshMapPage />;
}
