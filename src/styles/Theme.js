import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {},
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgb(0 0 0 / 12%)",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
          marginRight: 15,
        },
      },
    },
  },
});
