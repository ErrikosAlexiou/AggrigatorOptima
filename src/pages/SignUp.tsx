import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router';

const SignUp = () => {
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
        {/* Sign Up Title */}
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
          Sign Up
        </Typography>

        {/* First Name and Last Name Row */}
        <Box
          sx={{
            display: 'flex',
            gap: '18px',
            marginBottom: '28px',
            width: '392px',
          }}
        >
          <TextField
            placeholder="First Name"
            sx={{
              width: '187px',
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
          <TextField
            placeholder="Last Name"
            sx={{
              width: '187px',
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
        </Box>

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

        {/* Password Field */}
        <TextField
          placeholder="Password"
          type="password"
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

        {/* Terms and Conditions Checkbox */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '392px',
            marginBottom: '24px',
          }}
        >
          <Checkbox
            sx={{
              width: '15px',
              height: '15px',
              padding: 0,
              marginRight: '10px',
              color: '#FFFFFF',
              '&.Mui-checked': {
                color: '#000000',
              },
            }}
          />
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '15px',
              color: '#000000',
            }}
          >
            I agree to the terms and conditions
          </Typography>
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

      {/* Log In Link */}
      <Link
        component="button"
        onClick={() => navigate('/login')}
        sx={{
          position: 'absolute',
          width: '47px',
          height: '19px',
          left: '522px',
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
        Log In
      </Link>
    </Box>
  );
};

export default SignUp;
