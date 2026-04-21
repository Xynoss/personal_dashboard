import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useTheme } from '@mui/material';

export default function CpuChart({ data }) {
  const theme = useTheme(); // Pour récupérer les couleurs du mode sombre/clair

  return (
    <div style={{ width: '100%', height: 200, marginTop: '20px' }}>
      <ResponsiveContainer>
        <AreaChart width={'100%'} height={'100%'} data={data}>
          <defs>
            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
          <XAxis dataKey="time" hide />
          <YAxis domain={[0, 100]} hide />
          <Tooltip 
            contentStyle={{ backgroundColor: theme.palette.background.paper, border: 'none', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={theme.palette.primary.main} 
            fillOpacity={1} 
            fill="url(#colorCpu)" 
            isAnimationActive={false} // Désactivé pour un rendu plus fluide en temps réel
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}