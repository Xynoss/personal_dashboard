import { useState, useEffect } from 'react';

// Import des composants Material UI
import { 
  AppBar, Toolbar, Typography, Container, Grid, 
  Card, CardContent, Chip, Box, LinearProgress 
} from '@mui/material';

// Import d'une icône
import DashboardIcon from '@mui/icons-material/Dashboard';

function App() {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données (inchangée)
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

  // Petite fonction utilitaire pour choisir la couleur du Chip
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'success': return 'success'; // Vert
      case 'warning': return 'warning'; // Orange
      case 'error': return 'error';     // Rouge
      default: return 'primary';        // Bleu par défaut
    }
  };

  return (
    // Box est une simple div, mais avec accès au système de style MUI
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* --- 1. BARRE DE NAVIGATION (AppBar) --- */}
      <AppBar position="static">
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mon Dashboard Java
          </Typography>
        </Toolbar>
      </AppBar>

      {/* --- 2. CONTENU PRINCIPAL --- */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        
        {/* Barre de chargement si loading est vrai */}
        {loading && <LinearProgress color="secondary" sx={{ mb: 2 }} />}

        {/* --- 3. GRILLE DES WIDGETS --- */}
        <Grid container spacing={3}>
          {widgets.map((widget, index) => (
            // Grid item : xs=12 (plein écran sur mobile), md=4 (3 colonnes sur PC)
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={3}> {/* elevation = ombre portée */}
                <CardContent>
                  
                  {/* Titre et Status alignés */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" color="text.secondary">
                      {widget.title}
                    </Typography>
                    
                    <Chip 
                      label={widget.status} 
                      color={getStatusColor(widget.status)} 
                      size="small" 
                    />
                  </Box>

                  {/* Contenu principal du widget */}
                  <Typography variant="h4" component="div">
                    {widget.content}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}

export default App;