'use client';

import { NewsPage, SiteFrame, useSiteNav } from '../_site/shared';

export default function Page() {
  const nav = useSiteNav();
  return (
    <SiteFrame currentPage="news" nav={nav}>
      <NewsPage />
    </SiteFrame>
  );
}
