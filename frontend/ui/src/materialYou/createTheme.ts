import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import createPalette from "@mui/material/styles/createPalette";
import extendTheme from "@mui/material/styles/experimental_extendTheme";
import {
  MuiButton,
  MuiButtonGroup,
  MuiCard,
  MuiCardContent,
  MuiDialog,
  MuiDialogActions,
  MuiDialogContent,
  MuiDialogTitle,
  MuiLinearProgress,
  MuiMenu,
  MuiPaper,
  MuiSwitch,
} from "./themeComponents";
import { MUI_BREAKPOINTS } from "./themeConsts.mjs";

interface ThemeSchema {
  primary_color: string;
  secondary_color: string;
  primary_text: string;
  secondary_text: string;
  info_color: string;
  error_color: string;
  warning_color: string;
  success_color: string;
  font_family?: string;
}

export const createMDYTheme = (themeSchema: ThemeSchema) => {
  const materialColor = themeFromSourceColor(
    argbFromHex(themeSchema.primary_color),
  );

  const generatePalette = (mode: "light" | "dark") => {
    return createPalette({
      mode,
      primary: {
        main: hexFromArgb(materialColor.schemes[mode].primary),
      },
      secondary: {
        main: hexFromArgb(materialColor.schemes[mode].secondary),
      },
      error: {
        main: hexFromArgb(materialColor.schemes[mode].error),
      },
      text: {
        primary: hexFromArgb(materialColor.schemes[mode].onPrimaryContainer),
        secondary: hexFromArgb(
          materialColor.schemes[mode].onSecondaryContainer,
        ),
      },
    });
  };

  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: generatePalette("light"),
      },
      dark: {
        palette: generatePalette("dark"),
      },
    },
    typography: {
      fontFamily: themeSchema?.font_family,
    },
    components: {
      MuiButton,
      MuiButtonGroup,
      MuiCard,
      MuiCardContent,
      MuiDialog,
      MuiDialogActions,
      MuiDialogContent,
      MuiDialogTitle,
      MuiLinearProgress,
      MuiMenu,
      MuiPaper,
      MuiSwitch,
    },
    breakpoints: MUI_BREAKPOINTS,
  });

  return theme;
};