import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '982px',
        background: '#FFFFFF',
      }}
    >
      {/* Aggrigator Optima Header */}
      <Typography
        sx={{
          position: 'absolute',
          width: '261px',
          height: '36px',
          left: 'calc(50% - 261px/2)',
          top: '96px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '30px',
          lineHeight: '36px',
          color: '#000000',
          textAlign: 'center',
        }}
      >
        Aggrigator Optima
      </Typography>

      {/* Form Container */}
      <Box
        sx={{
          position: 'absolute',
          width: '505px',
          height: '474px',
          left: 'calc(50% - 505px/2)',
          top: 'calc(50% - 474px/2)',
          background: '#D9D9D9',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '60px',
        }}
      >
        {/* Log In Title */}
        <Typography
          sx={{
            width: '209px',
            height: '29px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '29px',
            textAlign: 'center',
            color: '#000000',
            marginBottom: '48px',
          }}
        >
          Log In
        </Typography>

        {/* Email Field */}
        <TextField
          placeholder="Email"
          type="email"
          sx={{
            width: '392px',
            height: '43px',
            marginBottom: '28px',
            background: '#FFFFFF',
            borderRadius: '20px',
            '& .MuiOutlinedInput-root': {
              height: '43px',
              borderRadius: '20px',
              '& fieldset': {
                border: 'none',
              },
              '& input': {
                padding: '12px 16px',
                fontFamily: 'Inter',
                fontSize: '16px',
                color: '#6E6E6E',
                '&::placeholder': {
                  color: '#6E6E6E',
                  opacity: 1,
                },
              },
            },
          }}
        />

        {/* Password Field with Forgot Password Link */}
        <Box sx={{ position: 'relative', width: '392px', marginBottom: '28px' }}>
          <TextField
            placeholder="Password"
            type="password"
            sx={{
              width: '392px',
              height: '43px',
              background: '#FFFFFF',
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': {
                height: '43px',
                borderRadius: '20px',
                '& fieldset': {
                  border: 'none',
                },
                '& input': {
                  padding: '12px 16px',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  color: '#6E6E6E',
                  '&::placeholder': {
                    color: '#6E6E6E',
                    opacity: 1,
                  },
                },
              },
            }}
          />
          <Link
            component="button"
            sx={{
              position: 'absolute',
              right: 0,
              top: '48px',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '19px',
              color: '#818080',
              textDecoration: 'none',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            Forgot Password?
          </Link>
        </Box>

        {/* Submit Button */}
        <Button
          onClick={() => navigate('/dashboard')}
          sx={{
            width: '171px',
            height: '43px',
            background: '#FFFFFF',
            borderRadius: '20px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '24px',
            color: '#000000',
            textTransform: 'none',
            '&:hover': {
              background: '#F0F0F0',
            },
          }}
        >
          Submit
        </Button>
      </Box>

      {/* Sign Up Link */}
      <Link
        component="button"
        onClick={() => navigate('/signup')}
        sx={{
          position: 'absolute',
          width: '60px',
          height: '19px',
          left: '524px',
          top: '731px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '19px',
          color: '#000000',
          textDecoration: 'none',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
        }}
      >
        Sign Up
      </Link>
    </Box>
  );
};

export default Login;
