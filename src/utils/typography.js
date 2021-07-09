import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  headerFontFamily: ["Inter", "sans-serif"],
  bodyFontFamily: ["Inter", "sans-serif"],
  overrideThemeStyles: () => ({
    a: {
      color: "#008ecf",
      textDecoration: "none",
    },
    h3: {
      marginBottom: "0.75rem",
    },
    p: {
      marginBottom: "0.75rem",
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
