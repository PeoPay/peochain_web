/**
 * Design Tokens
 * 
 * This file centralizes all design variables used throughout the application.
 * By maintaining these tokens in a single location, we ensure consistency
 * and make global style updates more manageable.
 */

export const colors = {
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    light: 'hsl(var(--primary) / 0.1)',
    medium: 'hsl(var(--primary) / 0.5)',
    dark: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    light: 'hsl(var(--secondary) / 0.1)',
    medium: 'hsl(var(--secondary) / 0.5)',
    dark: 'hsl(var(--secondary) / 0.8)',
    foreground: 'hsl(var(--secondary-foreground))',
  },
  background: {
    DEFAULT: 'hsl(var(--background))',
    card: 'hsl(var(--card))',
    popover: 'hsl(var(--popover))',
  },
  foreground: {
    DEFAULT: 'hsl(var(--foreground))',
    muted: 'hsl(var(--muted-foreground))',
    card: 'hsl(var(--card-foreground))',
    popover: 'hsl(var(--popover-foreground))',
  },
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
  },
  chart: {
    1: 'hsl(var(--chart-1))',
    2: 'hsl(var(--chart-2))',
    3: 'hsl(var(--chart-3))',
    4: 'hsl(var(--chart-4))',
    5: 'hsl(var(--chart-5))',
  },
};

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    heading: ['Poppins', 'sans-serif'],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const borderRadius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  '2xl': 'calc(var(--radius) + 8px)',
  '3xl': 'calc(var(--radius) + 12px)',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};

export const animations = {
  fadeIn: 'fadeIn 0.5s ease-out',
  fadeInSlow: 'fadeIn 0.8s ease-out',
  slideUp: 'slideUp 0.5s ease-out',
  slideUpSlow: 'slideUp 0.8s ease-out',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
};

export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
};

// Composite tokens for common UI patterns
export const patterns = {
  card: {
    primary: {
      background: colors.background.card,
      border: `1px solid ${colors.border}`,
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      shadow: shadows.md,
    },
    secondary: {
      background: colors.background.DEFAULT,
      border: `1px solid ${colors.border}`,
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      shadow: shadows.sm,
    },
    accent: {
      background: colors.primary.light,
      border: `1px solid ${colors.primary.DEFAULT}`,
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      shadow: shadows.md,
    },
  },
  section: {
    default: {
      padding: `${spacing[16]} ${spacing[4]}`,
      maxWidth: '1400px',
      margin: '0 auto',
    },
    narrow: {
      padding: `${spacing[16]} ${spacing[4]}`,
      maxWidth: '1200px',
      margin: '0 auto',
    },
  },
  button: {
    primary: {
      background: colors.primary.DEFAULT,
      color: colors.primary.foreground,
      borderRadius: borderRadius.md,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontWeight: typography.fontWeight.medium,
    },
    secondary: {
      background: colors.secondary.DEFAULT,
      color: colors.secondary.foreground,
      borderRadius: borderRadius.md,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontWeight: typography.fontWeight.medium,
    },
    outline: {
      background: 'transparent',
      color: colors.foreground.DEFAULT,
      border: `1px solid ${colors.border}`,
      borderRadius: borderRadius.md,
      padding: `${spacing[3]} ${spacing[6]}`,
      fontWeight: typography.fontWeight.medium,
    },
  },
};

// Export all tokens as a single object for easy access
export const tokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animations,
  zIndex,
  patterns,
};
