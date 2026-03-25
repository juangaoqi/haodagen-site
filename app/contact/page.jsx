'use client';

import { ContactPage, SiteFrame, useSiteNav } from '../_site/shared';

export default function Page() {
  const nav = useSiteNav();
  return (
    <SiteFrame currentPage="contact" nav={nav}>
      <ContactPage />
    </SiteFrame>
  );
}
