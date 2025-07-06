'use client';

import Header from './index';
import { usePathname } from 'next/navigation';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/cadastro');

  if (isAuthRoute) return null;

  return <Header />;
}
