import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';

interface SWRConfigProviderProps {
  children: ReactNode;
}

export const SWRConfigProvider: React.FC<SWRConfigProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: false,
        dedupingInterval: 600000, // 10 minutes
        focusThrottleInterval: 5000,
        errorRetryCount: 3,
        fetcher: async (url: string) => {
          const res = await fetch(url);
          if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.');
            throw error;
          }
          return res.json();
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};