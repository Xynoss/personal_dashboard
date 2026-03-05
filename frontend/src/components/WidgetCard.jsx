import { Card, CardContent, Typography, Box, Chip, LinearProgress} from '@mui/material';

export default function WidgetCard({ widget, darkMode }) {

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
    <Card elevation={darkMode ? 4 : 2}>
      <CardContent>
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

        <Typography variant="h4" component="div" sx={{ mb: isCpuWidget ? 2 : 0 }}>
          {widget.content}
        </Typography>

        {isCpuWidget && (
            <LinearProgress
              variant="determinate"
              value={numericValue}
              color={getStatusColor(widget.status)}
              sx={{ height: 10, borderRadius: 5 }}
            />
        )}
      </CardContent>
    </Card>
  );
}