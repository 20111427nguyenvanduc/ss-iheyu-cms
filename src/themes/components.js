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
          borderRadius: "16px",
          "& fieldset": {
            borderRadius: "16px",
          },
          "&:hover fieldset": {
            borderRadius: "16px",
          },
          "&.Mui-focused fieldset": {
            borderRadius: "16px",
          },
        },
      },
    },
  };
}
