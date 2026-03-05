import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <DashboardIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mon Dashboard Java
        </Typography>

        {/* Le bouton pour basculer le thème */}
        <IconButton
          sx={{ ml: 1 }}
          onClick={toggleDarkMode}
          color="inherit"
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}