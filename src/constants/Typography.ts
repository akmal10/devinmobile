export const Typography = {
  fontFamily: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },

  fontSize: {
    h1: 26,           // H1 Page Title: 24-28px
    h2: 21,           // H2 Section Title: 20-22px  
    h3: 18,           // H3 Subheading/Card Title: 18px
    bodyPrimary: 16,  // Body Primary: 16px
    bodySecondary: 14, // Body Secondary/Labels: 14px
    caption: 12,      // Caption/Meta Info: 12px
    buttonPrimary: 16, // Button Text Primary CTA: 16px
    buttonSecondary: 14, // Button Text Secondary: 14px
    chartMainValue: 22, // Chart Main Value/KPI: 20-24px
    chartAxisLabels: 13, // Chart Axis Labels: 12-14px
    chartDataLabels: 12, // Chart Data Labels: 12px
    chartLegends: 12,   // Chart Legends: 12px
    chartTooltips: 12,  // Chart Tooltips: 12px
    chartSectionTitle: 18, // Chart Section Title: 18px
    chartSubtext: 14,   // Chart Subtext: 14px
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },

  lineHeight: {
    headings: 1.25,      // 1.2-1.3 for headings
    body: 1.45,          // 1.4-1.5 for body text
    caption: 1.35,       // 1.3 for captions and meta
    chartMainValues: 1.2, // 1.2 for main values
    chartLabels: 1.35,   // 1.3-1.4 for labels and legends
  },

  styles: {
    h1PageTitle: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 26,
      fontWeight: '600' as const,
      lineHeight: 26 * 1.25,
    },
    h2SectionTitle: {
      fontFamily: 'Inter_600SemiBold', 
      fontSize: 21,
      fontWeight: '600' as const,
      lineHeight: 21 * 1.25,
    },
    h3CardTitle: {
      fontFamily: 'Inter_500Medium',
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 18 * 1.25,
    },
    bodyPrimary: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 16 * 1.45,
    },
    bodySecondary: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 14 * 1.45,
    },
    caption: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 12 * 1.35,
    },
    buttonPrimary: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 16 * 1.35,
    },
    buttonSecondary: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 14 * 1.35,
    },
    chartMainValue: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 22,
      fontWeight: '600' as const,
      lineHeight: 22 * 1.2,
    },
    chartAxisLabels: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      fontWeight: '400' as const,
      lineHeight: 13 * 1.35,
    },
    chartDataLabels: {
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 12 * 1.35,
    },
    chartLegends: {
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 12 * 1.35,
    },
    chartTooltips: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 12 * 1.35,
    },
    chartSectionTitle: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 18 * 1.25,
    },
    chartSubtext: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 14 * 1.45,
    },
  },
};
