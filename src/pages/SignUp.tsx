import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              color: '#000000',
              marginBottom: 2,
            }}
          >
            Sign Up
          </Typography>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: '50px',
              background: '#D9D9D9',
              color: '#000000',
              borderRadius: '20px',
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '20px',
              textTransform: 'none',
              '&:hover': {
                background: '#C9C9C9',
              },
            }}
            onClick={() => navigate('/dashboard')}
          >
            Sign Up
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/login')}
            sx={{
              fontFamily: 'Inter',
              color: '#000000',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Already have an account? Login
          </Link>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/')}
            sx={{
              fontFamily: 'Inter',
              color: '#000000',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Back to Home
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;

