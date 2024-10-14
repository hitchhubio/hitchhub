export type BoxProps = {
  as?: React.ElementType;
  children?: React.ReactNode;
  [x: string]: unknown;
};

export function Box({ as: Component = 'div', ...props }: BoxProps) {
  return <Component {...props} />;
}
