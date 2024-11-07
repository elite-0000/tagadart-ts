import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { swrConfig } from '@/hooks/useSWRConfig';

interface SWRConfigProviderProps {
  children: ReactNode;
}

export const SWRConfigProvider: React.FC<SWRConfigProviderProps> = ({ children }) => {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};