export type FooterProps = {
  children?: React.ReactNode;
};

export function Footer({ children }: FooterProps) {
  return <footer>{children}</footer>;
}
