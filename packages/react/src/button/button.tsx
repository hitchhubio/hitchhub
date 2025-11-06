export type ButtonProps = {
  children: React.ReactNode;
};

export function Button({ children }: ButtonProps) {
  return <p className="hh-bg-blue-500">{children}</p>;
}
