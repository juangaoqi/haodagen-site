import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '西式简餐门店食材供货｜德式香肠选品指南｜豪大根',
  description: '专为西式简餐、德式酒馆和轻食门店整理的食材选品指南。图林根香肠、德式系列稳定供货，提供菜单搭配建议。',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
