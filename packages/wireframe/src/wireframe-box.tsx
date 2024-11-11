import { __unstable__loadDesignSystem } from 'tailwindcss';

export type WireframeBoxProps = {
  as?: React.ElementType;
  children?: React.ReactNode;
  [x: string]: unknown;
};

const css = `
@theme {
  --color-pink-500: #c0c;
}`;

export function WireframeBox({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  as = 'div',
  ...props
}: WireframeBoxProps) {
  //const designSystem = await __unstable__loadDesignSystem(css);

  // console.log(designSystem.candidatesToCss(['text-pink-500', 'bg-pink-500']));

  return (
    <div>
      <p>wireframe</p>
      <div {...props} />
    </div>
  );
}
