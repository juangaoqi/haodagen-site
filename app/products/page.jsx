'use client';

import { ProductsPage, SiteFrame, useSiteNav } from '../_site/shared';

export default function Page() {
  const nav = useSiteNav();
  return (
    <SiteFrame currentPage="products" nav={nav}>
      <ProductsPage nav={nav} />
    </SiteFrame>
  );
}
