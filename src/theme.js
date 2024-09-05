import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B8D9", // Turquoise Vif
      contrastText: "#FFFFFF", // Texte blanc pour un bon contraste
    },
    secondary: {
      main: "#FF7043", // Orange Chaud
      contrastText: "#FFFFFF", // Texte blanc pour un bon contraste
    },
    error: {
      main: "#D32F2F", // Rouge Foncé pour les erreurs
      contrastText: "#FFFFFF", // Texte blanc
    },
    warning: {
      main: "#FFB300", // Ambre Foncé pour les avertissements
      contrastText: "#212121", // Texte noir/gris très foncé pour assurer la lisibilité
    },
    info: {
      main: "#1976D2", // Bleu Foncé pour les informations
      contrastText: "#FFFFFF", // Texte blanc
    },
    success: {
      main: "#388E3C", // Vert Foncé pour les succès
      contrastText: "#FFFFFF", // Texte blanc
    },
    background: {
      default: "#F5F5F5", // Fond général gris clair neutre
      paper: "#FFFFFF", // Fond des cartes et des modals
    },
    text: {
      primary: "#212121", // Texte principal en noir
      secondary: "#37474F", // Texte secondaire en bleu gris foncé
      disabled: "#BDBDBD", // Texte désactivé en gris moyen
    },
    action: {
      active: "#00B8D9", // Couleur pour les icônes actives
      disabled: "#BDBDBD", // Couleur pour les icônes désactivées
      hover: "#E0F7FA", // Hover sur les éléments interactifs
      selected: "#00796B", // Éléments sélectionnés
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
          backgroundColor: "#00B8D9",
          "&:hover": {
            backgroundColor: "#E0F7FA",
          },
          "&:disabled": {
            backgroundColor: "#BDBDBD",
            color: "#E0E0E0",
          },
        },
        containedSecondary: {
          backgroundColor: "#FF7043",
          "&:hover": {
            backgroundColor: "#FF8A65",
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
          backgroundColor: "#00B8D9", // Couleur de l'AppBar
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
