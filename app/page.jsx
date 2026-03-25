'use client';

import { HomePage, SiteFrame, useSiteNav } from './_site/shared';

export default function Page() {
  const nav = useSiteNav();
  return (
    <SiteFrame currentPage="home" nav={nav}>
      <HomePage nav={nav} />
    </SiteFrame>
  );
}
