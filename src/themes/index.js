import React from "react"
import { createTheme } from "@mui/material/styles"

// assets
import { colors } from "./themesVars.js"

// project imports
import componentStyleOverrides from "./compStyleOverride"
import themePalette from "./palette"
import themeTypography from "./typography"
import themeComponents from "./components"

export function theme(customization) {
 const color = colors

 const themeOption = {
  colors,
  customization,
 }

 return createTheme({
  direction: "ltr",
  palette: themePalette(themeOption),
  typography: themeTypography(themeOption),
  components: themeComponents(themeOption),
 })
}

export default theme
