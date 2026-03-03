/**
 * App-wide theme matching Login screen.
 * Primary = cyan fill. Secondary = white with blue border.
 */

export const colors = {
  // Backgrounds
  screen: '#E0F7FA',
  card: '#FFFFFF',

  // Text
  title: '#00796B',
  body: '#004D40',
  muted: '#00695C',
  link: '#0097A7',

  // Borders & inputs
  inputBorder: '#B2EBF2',
  border: '#B2EBF2',

  // Buttons
  primary: '#00BCD4',
  primaryText: '#FFFFFF',
  secondaryBg: '#FFFFFF',
  secondaryBorder: '#00BCD4',
  secondaryText: '#0097A7',
  destructive: '#D32F2F',
  destructiveText: '#FFFFFF',
} as const;

export const spacing = {
  screen: 24,
  card: 16,
  input: 15,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
} as const;

export const borderRadius = {
  input: 15,
  button: 15,
  card: 12,
} as const;

export const typography = {
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    fontFamily: 'Poppins-SemiBold',
  },
  body: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    fontFamily: 'Poppins-SemiBold',
  },
} as const;

// Reusable style objects for StyleSheet.create
export const common = {
  screen: {
    flex: 1,
    padding: spacing.screen,
    backgroundColor: colors.screen,
  },
  title: {
    ...typography.title,
    color: colors.title,
    textAlign: 'center' as const,
    marginBottom: 28,
  },
  input: {
    height: 55,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: borderRadius.input,
    paddingHorizontal: 18,
    marginBottom: 20,
    backgroundColor: colors.card,
    color: colors.body,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  // Primary: cyan filled
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.button,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.primaryText,
    ...typography.button,
    fontSize: 18,
  },
  // Secondary: white with blue border
  secondaryButton: {
    backgroundColor: colors.secondaryBg,
    borderWidth: 2,
    borderColor: colors.secondaryBorder,
    borderRadius: borderRadius.button,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  secondaryButtonText: {
    color: colors.secondaryText,
    ...typography.button,
    fontSize: 16,
  },
  // Destructive (delete, logout)
  destructiveButton: {
    backgroundColor: colors.destructive,
    borderRadius: borderRadius.button,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  destructiveButtonText: {
    color: colors.destructiveText,
    ...typography.button,
    fontSize: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.card,
    padding: spacing.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
} as const;
