export type WireframeBoxProps = {
  as?: React.ElementType;
  children?: React.ReactNode;
  [x: string]: unknown;
};

export function WireframeBox({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  as = 'div',
  ...props
}: WireframeBoxProps) {
  return (
    <div>
      <p>wireframe</p>
      <div {...props} />
    </div>
  );
}
