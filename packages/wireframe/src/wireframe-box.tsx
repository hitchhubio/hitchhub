export type WireframeBoxProps = {
  as?: React.ElementType;
  children?: React.ReactNode;
  [x: string]: unknown;
};

export function WireframeBox({
  as: Component = 'div',
  ...props
}: WireframeBoxProps) {
  return (
    <div>
      <p>wireframe</p>
      <Component {...props} />
    </div>
  );
}
