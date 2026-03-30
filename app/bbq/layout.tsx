import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '烤肉店食材供货商｜烧烤门店香肠选品指南｜豪大根',
  description: '专为烤肉门店整理的食材选品指南。火山石烤肠、澎湖墨鱼肠、台式飞鱼卵香肠稳定供货，提供选品建议和定制贴牌支持。',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
