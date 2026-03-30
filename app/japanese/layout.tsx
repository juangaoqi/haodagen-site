import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '日式餐饮门店食材供货｜日式肠类选品指南｜豪大根',
  description: '专为日式定食、居酒屋和料理门店整理的食材选品指南。海藻墨鱼肠、日式系列稳定供货，风味真正契合日式调性。',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
