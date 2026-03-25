'use client';

import { AboutPage, SiteFrame, useSiteNav } from '../_site/shared';

export default function Page() {
  const nav = useSiteNav();
  return (
    <SiteFrame currentPage="about" nav={nav}>
      <AboutPage nav={nav} />
    </SiteFrame>
  );
}
