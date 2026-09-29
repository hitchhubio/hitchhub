import type { ReactNode } from 'react';

export type FooterProps = {
  children?: ReactNode;
};

export function Footer({ children }: FooterProps) {
  return <footer>{children}</footer>;
}
