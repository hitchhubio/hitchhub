import { deepmerge } from '@aaos/deepmerge';
import { variables } from '@hitchhub/tokens';
import tailwindTheme from 'tailwindcss/defaultTheme.js';
import { CustomThemeConfig } from 'tailwindcss/types/config.js';
import { convertColors, toFont } from './utils.js';

export type CreateThemeOptions = {
  meta?: any;
  overrides?: Partial<CustomThemeConfig>;
};

export function createTheme(
  options?: CreateThemeOptions,
): Partial<CustomThemeConfig> {
  const { meta, overrides } = options ?? {};

  // TODO: type variables and meta
  const fontValueResolver = ({
    property,
    index,
  }: {
    property: string;
    index: string;
  }): string => {
    return meta
      ? meta.light.resolved.primitive.font[property][index].$value
      : (variables.primitive.font as any)[property][index];
  };

  const defaultTheme: Partial<CustomThemeConfig> = {
    ...tailwindTheme,
    container: {
      padding: {
        DEFAULT: '16px', // TODO: use tokens
        sm: '16px',
        md: '32px',
        lg: '64px',
        xl: '96px',
        '2xl': '128px',
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      ...(meta
        ? convertColors(meta.light.resolved.primitive.color)
        : variables.primitive.color),
    },
    fontFamily: {
      primary: variables.primitive.font.family.primary,
      secondary: variables.primitive.font.family.secondary,
      tertiary: variables.primitive.font.family.tertiary,
    },
    fontSize: {
      '3xs': toFont({
        valueResolver: fontValueResolver,
        fontSize: '50',
        lineHeight: '1000',
      }),
      '2xs': toFont({
        valueResolver: fontValueResolver,
        fontSize: '100',
        lineHeight: '1000',
      }),
      xs: toFont({
        valueResolver: fontValueResolver,
        fontSize: '200',
        lineHeight: '1000',
      }),
      // Start of standard scale
      sm: toFont({
        valueResolver: fontValueResolver,
        fontSize: '300',
        lineHeight: '1000',
      }),
      md: toFont({
        valueResolver: fontValueResolver,
        fontSize: '400',
        lineHeight: '1000',
      }),
      lg: toFont({
        valueResolver: fontValueResolver,
        fontSize: '500',
        lineHeight: '1000',
      }),
      xl: toFont({
        valueResolver: fontValueResolver,
        fontSize: '600',
        lineHeight: '700',
      }),
      '2xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '700',
        lineHeight: '700',
      }),
      '3xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '800',
        lineHeight: '700',
      }),
      '4xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '900',
        lineHeight: '700',
      }),
      '5xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '1000',
        lineHeight: '700',
      }),
      '6xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '1100',
        lineHeight: '400',
      }),
      // End of standard scale
      '7xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '1200',
        lineHeight: '400',
      }),
      '8xl': toFont({
        valueResolver: fontValueResolver,
        fontSize: '1300',
        lineHeight: '400',
      }),
    },
    fontWeight: {
      thin: variables.primitive.font.weight['100'],
      extralight: variables.primitive.font.weight['200'],
      light: variables.primitive.font.weight['300'],
      normal: variables.primitive.font.weight['400'],
      medium: variables.primitive.font.weight['500'],
      semibold: variables.primitive.font.weight['600'],
      bold: variables.primitive.font.weight['700'],
      extrabold: variables.primitive.font.weight['800'],
      black: variables.primitive.font.weight['900'],
    },
    borderWidth: {
      xs: variables.primitive.border.width['100'],
      sm: variables.primitive.border.width['200'],
      md: variables.primitive.border.width['300'],
      lg: variables.primitive.border.width['400'],
      xl: variables.primitive.border.width['500'],
      '2xl': variables.primitive.border.width['600'],
      '3xl': variables.primitive.border.width['700'],
      '4xl': variables.primitive.border.width['800'],
      DEFAULT: variables.primitive.border.width['100'],
    },
    borderRadius: {
      // "none": tokens.goiveBorderRadiusNone,
      sm: variables.primitive.border.radius['100'],
      md: variables.primitive.border.radius['200'],
      lg: variables.primitive.border.radius['300'],
      xl: variables.primitive.border.radius['400'],
      '2xl': variables.primitive.border.radius['500'],
      '3xl': variables.primitive.border.radius['600'],
      full: variables.primitive.border.radius.full,
      DEFAULT: variables.primitive.border.radius['200'],
    },
    zIndex: {
      1: variables.primitive.zIndex['1'],
      100: variables.primitive.zIndex['100'],
      200: variables.primitive.zIndex['200'],
      300: variables.primitive.zIndex['300'],
      400: variables.primitive.zIndex['400'],
      500: variables.primitive.zIndex['500'],
      600: variables.primitive.zIndex['600'],
      700: variables.primitive.zIndex['700'],
      800: variables.primitive.zIndex['800'],
      900: variables.primitive.zIndex['900'],
      1000: variables.primitive.zIndex['1000'],
    },
    opacity: {
      '0': variables.primitive.opacity['0'],
      '5': variables.primitive.opacity['5'],
      '10': variables.primitive.opacity['10'],
      '15': variables.primitive.opacity['15'],
      '20': variables.primitive.opacity['20'],
      '25': variables.primitive.opacity['25'],
      '30': variables.primitive.opacity['30'],
      '35': variables.primitive.opacity['35'],
      '40': variables.primitive.opacity['40'],
      '45': variables.primitive.opacity['45'],
      '50': variables.primitive.opacity['50'],
      '55': variables.primitive.opacity['55'],
      '60': variables.primitive.opacity['60'],
      '65': variables.primitive.opacity['65'],
      '70': variables.primitive.opacity['70'],
      '75': variables.primitive.opacity['75'],
      '80': variables.primitive.opacity['80'],
      '85': variables.primitive.opacity['85'],
      '90': variables.primitive.opacity['90'],
      '95': variables.primitive.opacity['95'],
      '100': variables.primitive.opacity['100'],
    },
    // "boxShadow": {
    //   "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    //   "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    //   "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    //   "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    //   "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    //   "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    //   "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    //   "none": "none"
    // },
    spacing: {
      0: variables.primitive.space['0'],
      none: variables.primitive.space['0'],
      '3xs': variables.primitive.space.px,
      '2xs': variables.primitive.space['0-5'],
      xs: variables.primitive.space['1'],
      sm: variables.primitive.space['1-5'],
      md: variables.primitive.space['2'],
      lg: variables.primitive.space['3'],
      xl: variables.primitive.space['5'],
      '2xl': variables.primitive.space['8'],
      '3xl': variables.primitive.space['10'],
      '4xl': variables.primitive.space['12'],
      '5xl': variables.primitive.space['16'],
      '6xl': variables.primitive.space['20'],
    },
    screens: {
      xs: meta ? meta.light.resolved.primitive.screen.xs.$value : '480px',
      sm: meta ? meta.light.resolved.primitive.screen.sm.$value : '640px',
      md: meta ? meta.light.resolved.primitive.screen.md.$value : '768px',
      lg: meta ? meta.light.resolved.primitive.screen.lg.$value : '1024px',
      xl: meta ? meta.light.resolved.primitive.screen.xl.$value : '1280px',
      '2xl': meta
        ? meta.light.resolved.primitive.screen['2xl'].$value
        : '1536px',
    },
    textUnderlineOffset: {
      // TODO: tokens
      '0': '0px',
      none: '0px',
      auto: 'auto',
      'from-font': 'from-font',
      xs: '1px',
      sm: '2px',
      md: '3px',
      lg: '4px',
      xl: '8px',
    },
    textDecorationThickness: {
      // TODO: tokens
      0: '0px',
      none: '0px',
      auto: 'auto',
      'from-font': 'from-font',
      xs: '1px',
      sm: '2px',
      md: '3px',
      lg: '4px',
      xl: '8px',
    },
    extend: {
      typography: () => {
        return {
          DEFAULT: {
            css: {
              p: {
                font: variables.semantic.typography.default.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: 'inherit',
              },
              h1: {
                font: variables.semantic.typography.default.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h2: {
                font: variables.semantic.typography.default.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h3: {
                font: variables.semantic.typography.default.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h4: {
                font: variables.semantic.typography.default.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h5: {
                font: variables.semantic.typography.default.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h6: {
                font: variables.semantic.typography.default.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
            },
          },
          xs: {
            css: {
              p: {
                font: variables.semantic.typography.xs.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: 'inherit',
              },
              h1: {
                font: variables.semantic.typography.xs.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h2: {
                font: variables.semantic.typography.xs.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h3: {
                font: variables.semantic.typography.xs.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h4: {
                font: variables.semantic.typography.xs.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h5: {
                font: variables.semantic.typography.xs.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h6: {
                font: variables.semantic.typography.xs.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
            },
          },
          md: {
            css: {
              p: {
                font: variables.semantic.typography.md.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: 'inherit',
              },
              h1: {
                font: variables.semantic.typography.md.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h2: {
                font: variables.semantic.typography.md.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h3: {
                font: variables.semantic.typography.md.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h4: {
                font: variables.semantic.typography.md.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h5: {
                font: variables.semantic.typography.md.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h6: {
                font: variables.semantic.typography.md.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
            },
          },
          xl: {
            css: {
              p: {
                font: variables.semantic.typography.xl.text.md,
                fontWeight: variables.primitive.font.weight['400'],
                fontFamily: 'inherit',
              },
              h1: {
                font: variables.semantic.typography.xl.heading.xl,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h2: {
                font: variables.semantic.typography.xl.heading.lg,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h3: {
                font: variables.semantic.typography.xl.heading.md,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h4: {
                font: variables.semantic.typography.xl.heading.sm,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h5: {
                font: variables.semantic.typography.xl.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
              h6: {
                font: variables.semantic.typography.xl.heading.xs,
                fontWeight: variables.primitive.font.weight['700'],
                fontFamily: 'inherit',
              },
            },
          },
        };
      },
    },
  };

  return deepmerge<CustomThemeConfig>(defaultTheme, overrides);
}
