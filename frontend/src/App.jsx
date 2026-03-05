import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, LinearProgress } from '@mui/material';

// Import de nos nouveaux composants !
import Navbar from './components/Navbar';
import WidgetCard from './components/WidgetCard';

function App() {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Configuration du thème
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
      }
    },
  });

  // Récupération des données depuis Spring Boot
  const fetchWidgets = () => {
    fetch('http://localhost:8080/api/dashboard/widgets')
      .then(response => response.json())
      .then(data => {
        setWidgets(data);
        setLoading(false);
      })
      .catch(error => console.error("Erreur API:", error));
  };

  useEffect(() => {
    fetchWidgets();
    const interval = setInterval(fetchWidgets, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>

        {/* On utilise notre composant Navbar en lui passant les paramètres */}
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {loading && <LinearProgress color="secondary" sx={{ mb: 2 }} />}

          <Grid container spacing={3}>
            {widgets.map((widget, index) => (
              <Grid item xs={12} md={4} key={index}>
                {/* On utilise notre composant WidgetCard pour chaque widget */}
                <WidgetCard widget={widget} darkMode={darkMode} />
              </Grid>
            ))}
          </Grid>
        </Container>

      </Box>
    </ThemeProvider>
  );
}

export default App;