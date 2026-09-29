import { createHitch, type Hitch } from '@hitchhub/core';
import { tailwind } from '@hitchhub/tailwind';
import { componentTokenContract } from './contract.js';

export function createDefaultHitch() {
  return createHitch({
    adapter: tailwind({ prefix: 'hitch' }),
    manifest: componentTokenContract,
  });
}

export function defineComponents(hitch: Hitch) {
  return {
    button: hitch.component('Button', {
      root: {
        paddingInline: 'space.4',
        paddingBlock: 'space.3',
        backgroundColor: 'button.primary.background.default',
        color: 'button.primary.text.default',
        borderRadius: 'border.form.radius.default',
      },
    }),
    avatar: hitch.component('Avatar', {
      root: {
        width: 'size.lg',
        height: 'size.lg',
        backgroundColor: 'surface.muted',
        borderRadius: 'border.radius.full',
      },
      initials: { color: 'text.default' },
    }),
    select: hitch.component('Select', {
      root: { gap: 'space.1' },
      trigger: {
        paddingInline: 'space.4',
        paddingBlock: 'space.2',
        backgroundColor: 'surface.secondary',
        color: 'form.text.default',
        borderColor: 'form.border.default',
        borderWidth: 'border.form.width.default',
        borderRadius: 'border.form.radius.default',
      },
      icon: { color: 'text.muted' },
    }),
  };
}

export const defaultHitch = createDefaultHitch();
export const definitions = defineComponents(defaultHitch);
