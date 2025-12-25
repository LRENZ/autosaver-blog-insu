import { getCtaUrls } from '@/lib/settings-actions';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const ctaUrls = await getCtaUrls();
  
  return <HeaderClient ctaUrl={ctaUrls.cta_get_quote_url} />;
}
