import { Box, Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <AppBar
        position="static"
        sx={{
          background: '#FFFFFF',
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '24px',
              color: '#000000',
            }}
          >
            Aggrigator Optima
          </Typography>
          <Button
            onClick={() => navigate('/')}
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '16px',
              color: '#000000',
              textTransform: 'none',
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Inter',
            fontWeight: 400,
            color: '#000000',
            marginBottom: 4,
          }}
        >
          Dashboard
        </Typography>
        <Box
          sx={{
            padding: 4,
            background: '#F5F5F5',
            borderRadius: '20px',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '20px',
              color: '#000000',
            }}
          >
            Dashboard content will be displayed here
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;

