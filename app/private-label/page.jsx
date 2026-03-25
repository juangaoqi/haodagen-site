'use client';

import { PrivateLabelPage, SiteFrame, useSiteNav } from '../_site/shared';

export default function Page() {
  const nav = useSiteNav();
  return (
    <SiteFrame currentPage="privateLabel" nav={nav}>
      <PrivateLabelPage nav={nav} />
    </SiteFrame>
  );
}
