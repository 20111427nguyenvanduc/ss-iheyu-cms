import { grey } from "@mui/material/colors"
export default function themePalette(theme) {
 return {
  mode: theme.customization.mode || "light",
  background: {
   main: theme.customization.mode === "dark" ? "#121212" : "#FFF",
   tableHead: theme.customization.mode === "dark" ? "#121212" : "#F0F0F1",
  },
  text:
   theme.customization.mode === "dark"
    ? {
       primary: "#ffffff",
       secondary: "rgba(255, 255, 255, 1)",
       disabled: "rgba(255, 255, 255, 1)",
       icon: "rgba(255, 255, 255, 1)",
      }
    : {
       primary: "#000000",
       secondary: "rgba(0, 0, 0, 1)",
       disabled: "rgba(0, 0, 0, 1)",
       icon: "rgba(0, 0, 0, 1)",
      },
  warning: {
   main: "#f8ac59",
   light: "#f7b731",
   dark: "#fed330",
   contractText: "#ffffff",
  },
  grey: {
   main: "#0a0a0a",
   dark: grey[900],
  },
 }
}
