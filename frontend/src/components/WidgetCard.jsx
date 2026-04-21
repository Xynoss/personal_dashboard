import { Card, CardContent, Typography, Box, Chip, LinearProgress} from '@mui/material';
import CpuChart from './CpuChart';

export default function WidgetCard({ widget, darkMode, history }) {

  // La fonction de couleur est maintenant encapsulée ici
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'primary';
    }
  };

  const isCpuWidget = widget.title === 'CPU Usage';
  const numericValue = isCpuWidget ? parseFloat(widget.content) : 0;

  return (
    <Card elevation={darkMode ? 4 : 2} sx={{ display: 'flex', flexDirection: 'column' , width: isCpuWidget ? '500px' : '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
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

        <Box sx={{
          display:'flex',
          flexDirection: isCpuWidget && widget.gridSize > 12 ? 'row' : 'column',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ mb: isCpuWidget ? 2 : 0 }}>
            {widget.content}
          </Typography>

          {isCpuWidget && (
            <CpuChart data={history}/>
          )}
        </Box>

        {widget.title.startsWith('Weather') && (
          <Box display="flex" alignItems="center" mt={1}>
            <img
              src={`https://openweathermap.org/img/wn/${widget.icon}@2x.png`}
              alt="weather icon"
              style={{ width: 50, height: 50 }}
            />
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {widget.description}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}