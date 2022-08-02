import './App.css';
import PokemonCards from './Cards';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    'cardHeading': React.CSSProperties;
    'appTitle': React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'cardHeading'?: React.CSSProperties;
    'appTitle'?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'cardHeading': true;
    'appTitle': true;
  }
}

const theme = createTheme({
  typography: {
    cardHeading: {
      fontWeight: 'bold'
    },
    appTitle: {
      fontWeight: 'bold',
      fontSize: '1.5em'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="appTitle" component="div" sx={{ flexGrow: 1 }}>Pokemon Cards</Typography>
          <IconButton href="https://github.com/kylelaker/pokemon-cards"><GitHubIcon sx={{ color: "#ffffff" }} /></IconButton>
        </Toolbar>
      </AppBar>
      <Box padding={2}>
        <PokemonCards />
      </Box>
    </ThemeProvider>
  );
}

export default App;
