import {
  Box,
  Typography,
  TextField,
  Avatar,
} from '@mui/material';
import { useState } from 'react';

const Profile = () => {
  const [selectedNav, setSelectedNav] = useState('Security');

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '982px',
        background: '#FFFFFF',
      }}
    >
      {/* Profile Picture */}
      <Avatar
        sx={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          left: '70px',
          top: '87px',
          background: '#D9D9D9',
        }}
      />

      {/* First Name */}
      <Typography
        sx={{
          position: 'absolute',
          width: '103px',
          height: '24px',
          left: '277px',
          top: '110px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '24px',
          color: '#000000',
        }}
      >
        First Name
      </Typography>

      {/* Last Name */}
      <Typography
        sx={{
          position: 'absolute',
          width: '102px',
          height: '24px',
          left: '395px',
          top: '110px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '24px',
          color: '#000000',
        }}
      >
        Last Name
      </Typography>

      {/* Email */}
      <Typography
        sx={{
          position: 'absolute',
          width: '51px',
          height: '24px',
          left: '277px',
          top: '151px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '24px',
          color: '#000000',
        }}
      >
        Email
      </Typography>

      {/* Navigation - Security Border */}
      {selectedNav === 'Security' && (
        <Box
          sx={{
            position: 'absolute',
            width: '77px',
            height: '38px',
            left: '81px',
            top: '349px',
            border: '1px solid #000000',
            borderRadius: '20px',
            boxSizing: 'border-box',
          }}
        />
      )}

      {/* Security Navigation */}
      <Typography
        onClick={() => setSelectedNav('Security')}
        sx={{
          position: 'absolute',
          width: '63px',
          height: '19px',
          left: '88px',
          top: '359px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '19px',
          color: '#000000',
          cursor: 'pointer',
        }}
      >
        Security
      </Typography>

      {/* Policies Navigation */}
      <Typography
        onClick={() => setSelectedNav('Policies')}
        sx={{
          position: 'absolute',
          width: '58px',
          height: '19px',
          left: '88px',
          top: '415px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '19px',
          color: '#000000',
          cursor: 'pointer',
        }}
      >
        Policies
      </Typography>

      {/* Data Navigation */}
      <Typography
        onClick={() => setSelectedNav('Data')}
        sx={{
          position: 'absolute',
          width: '36px',
          height: '19px',
          left: '88px',
          top: '472px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '19px',
          color: '#000000',
          cursor: 'pointer',
        }}
      >
        Data
      </Typography>

      {/* Main Content Container */}
      <Box
        sx={{
          position: 'absolute',
          width: '1165px',
          height: '594px',
          left: '254px',
          top: '277px',
          background: '#D9D9D9',
          borderRadius: '20px',
          padding: '60px 56px',
        }}
      >
        {/* Change your password? Section */}
        <Typography
          sx={{
            position: 'absolute',
            width: '183px',
            height: '19px',
            left: '56px',
            top: '60px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19px',
            color: '#000000',
          }}
        >
          Change your password?
        </Typography>

        {/* Old Password Field */}
        <TextField
          placeholder="Old Password"
          type="password"
          sx={{
            position: 'absolute',
            width: '392px',
            height: '43px',
            left: '56px',
            top: '99px',
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

        {/* New Password Field */}
        <TextField
          placeholder="New Password"
          type="password"
          sx={{
            position: 'absolute',
            width: '392px',
            height: '43px',
            left: '56px',
            top: '157px',
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

        {/* New Password (Confirm) Field */}
        <TextField
          placeholder="New Password"
          type="password"
          sx={{
            position: 'absolute',
            width: '392px',
            height: '43px',
            left: '56px',
            top: '215px',
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

        {/* Enable 2FA? Section */}
        <Typography
          sx={{
            position: 'absolute',
            width: '92px',
            height: '19px',
            left: '73px',
            top: '302px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19px',
            color: '#000000',
          }}
        >
          Enable 2FA?
        </Typography>

        {/* Phone Number Field */}
        <TextField
          placeholder="Phone Number"
          sx={{
            position: 'absolute',
            width: '392px',
            height: '43px',
            left: '56px',
            top: '341px',
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

        {/* Dropdown Button */}
        <Box
          sx={{
            position: 'absolute',
            width: '59px',
            height: '43px',
            left: '455px',
            top: '341px',
            background: '#FFFFFF',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '19px',
              color: '#000000',
            }}
          >
            v
          </Typography>
        </Box>

        {/* Using Auth App? Section */}
        <Typography
          sx={{
            position: 'absolute',
            width: '127px',
            height: '19px',
            left: '687px',
            top: '302px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19px',
            color: '#000000',
          }}
        >
          Using Auth App?
        </Typography>

        {/* QR Code Placeholder */}
        <Box
          sx={{
            position: 'absolute',
            width: '188px',
            height: '188px',
            left: '776px',
            top: '341px',
            background: '#FFFFFF',
            borderRadius: '20px',
          }}
        />
      </Box>
    </Box>
  );
};

export default Profile;

