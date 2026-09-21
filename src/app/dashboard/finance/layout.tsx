import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'অর্থ ব্যবস্থাপনা' };

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
