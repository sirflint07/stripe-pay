// src/components/providers.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children, ...props }: { children: React.ReactNode } & React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}