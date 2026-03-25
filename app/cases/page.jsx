'use client';

import { CasesPage, SiteFrame, useSiteNav } from '../_site/shared';

export default function Page() {
  const nav = useSiteNav();
  return (
    <SiteFrame currentPage="cases" nav={nav}>
      <CasesPage nav={nav} />
    </SiteFrame>
  );
}
