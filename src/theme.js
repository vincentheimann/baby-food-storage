import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF4081", // Rose vif
      contrastText: "#FFFFFF", // Texte blanc pour un bon contraste
    },
    secondary: {
      main: "#4781ff", // Bleu vif
      contrastText: "#FFFFFF", // Texte blanc pour un bon contraste
    },
    error: {
      main: "#F44336", // Rouge vif pour les erreurs
      contrastText: "#FFFFFF", // Texte blanc
    },
    warning: {
      main: "#FFEB3B", // Jaune vif pour les avertissements
      contrastText: "#333333", // Texte noir/gris très foncé pour assurer la lisibilité
    },
    info: {
      main: "#2196F3", // Bleu clair vif pour les informations
      contrastText: "#FFFFFF", // Texte blanc
    },
    success: {
      main: "#4CAF50", // Vert vif pour les succès
      contrastText: "#FFFFFF", // Texte blanc
    },
    background: {
      default: "#F5F5F5", // Fond général légèrement gris
      paper: "#FFFFFF", // Fond des cartes et des modals
    },
    text: {
      primary: "#212121", // Texte principal en gris très foncé
      secondary: "#757575", // Texte secondaire en gris moyen
      disabled: "#BDBDBD", // Texte désactivé en gris clair
    },
    action: {
      active: "#FF4081", // Couleur pour les icônes actives
      disabled: "#BDBDBD", // Couleur pour les icônes désactivées
      hover: "#ffdde9", // Hover sur les éléments interactifs
      selected: "#FF579C", // Éléments sélectionnés
    },
  },
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
    h1: {
      fontSize: "2rem", // 32px
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: "1.75rem", // 28px
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: "1.5rem", // 24px
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: "1.25rem", // 20px
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: "1.125rem", // 18px
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem", // 16px
      fontWeight: 700,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem", // 16px
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem", // 14px
      lineHeight: 1.5,
    },
    caption: {
      fontSize: "0.75rem", // 12px
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
        },
        containedPrimary: {
          backgroundColor: "#FF4081",
          "&:hover": {
            backgroundColor: "#ffdde9",
          },
          "&:disabled": {
            backgroundColor: "#BDBDBD",
            color: "#E0E0E0",
          },
        },
        containedSecondary: {
          backgroundColor: "#4781ff",
          "&:hover": {
            backgroundColor: "#5C6BC0",
          },
          "&:disabled": {
            backgroundColor: "#BDBDBD",
            color: "#E0E0E0",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          backgroundColor: "#FFFFFF", // Fond de carte par défaut
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FF4081", // Couleur de l'AppBar
          color: "#FFFFFF",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // Fond des champs de texte
          borderRadius: "8px",
        },
        input: {
          color: "#212121", // Couleur du texte
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#212121",
          color: "#FFFFFF",
          fontSize: "0.875rem",
        },
      },
    },
  },
});

export default theme;
