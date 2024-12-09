export default function themeTypography(theme) {
 return {
  MuiButton: {
   styleOverrides: {
    root: {
     borderRadius: "8px",
     boxShadow: "none",
    },
   },
  },
  MuiButtonBase: {
   styleOverrides: {
    root: {
     borderRadius: "8px",
    },
   },
  },
  MuiButtonGroup: {
   styleOverrides: {
    root: {
     borderRadius: "8px",
    },
   },
  },
  MuiTextField: {
   styleOverrides: {
    root: {
     borderRadius: "8px",
     "& fieldset": {
      borderRadius: "8px",
     },
    },
   },
  },
 }
}
