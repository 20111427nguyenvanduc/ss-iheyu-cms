export default function themeTypography(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          borderRadius: "12px",
          boxShadow: "none",
          textTransform: "none",
          "&.Mui-disabled": {
            backgroundColor: "#A1A7AE",
            color: "#FFF",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          "& fieldset": {
            borderRadius: "12px",
          },
          "&:hover fieldset": {
            borderRadius: "12px",
          },
          "&.Mui-focused fieldset": {
            borderRadius: "12px",
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        borderRadius: "16px",
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px", // Thêm border radius cho hộp thoại
        },
      },
    },
  };
}
