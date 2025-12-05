import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Figma base frame size (for reference)
const BASE_WIDTH = 1512;
const BASE_HEIGHT = 1435;

// Import images from Figma
const pieChartImg =
  'https://www.figma.com/api/mcp/asset/9eff5044-718b-4dc7-a13f-06874e61ec49';
const heatMapImg =
  'https://www.figma.com/api/mcp/asset/903ee3d9-eabe-4322-b7c0-6bce29a65d1b';
const barChartImg =
  'https://www.figma.com/api/mcp/asset/2109c6e5-c761-4e06-b894-ac79b1f04948';

interface MetricCardProps {
  value: string;
  color: string;
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
  fontSize?: number;
}

const MetricCard = ({
  value,
  color,
  leftPct,
  topPct,
  widthPct,
  heightPct,
  fontSize = 30,
}: MetricCardProps) => (
  <Box
    sx={{
      position: 'absolute',
      left: `${leftPct}%`,
      top: `${topPct}%`,
      width: `${widthPct}%`,
      height: `${heightPct}%`,
      border: '1px solid #000000',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFFFFF',
      boxSizing: 'border-box',
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: `${fontSize}px`,
        color,
        textAlign: 'center',
      }}
    >
      {value}
    </Typography>
  </Box>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState({ firstName: 'First Name', lastName: 'Last Name' });

  const suggestions = [
    '"Your energy usage is trending higher than expected for this period. Consider enabling automated load balancing to reduce HVAC and lighting consumption by an estimated 12–18%."',
    '"Your current supply chain shows elevated CO₂ intensity. Switching 2 of your top 10 vendors to verified low-carbon suppliers could reduce Scope 3 emissions by up to 22%."',
    '"We\'ve identified materials in your waste output that could be reclaimed or repurposed. Implementing a circular recovery workflow may cut waste emissions by 15% and reduce procurement costs."',
  ];

  // You can tweak this structure to match your backend later
  const metricData = [
    { label: '202.1KG o2', value: 202.1, unit: 'KG o2', color: '#EC9D00' },
    { label: '33% efficiency', value: 33, unit: '%', color: '#E80004' },
    { label: '22%^ Weekly', value: 22, unit: '%', color: '#3BB200', note: 'Weekly' },
  ];

  const handleExport = () => {
    const dataToExport = {
      user: userName,
      metrics: metricData,
      suggestions,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard-data.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: 2,
        px: { xs: 1, sm: 2 },
        boxSizing: 'border-box',
      }}
    >
      {/* Figma frame container – responsive, but preserves 1512x1435 aspect ratio */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: `${BASE_WIDTH}px`,
          aspectRatio: `${BASE_WIDTH} / ${BASE_HEIGHT}`,
          margin: '0 auto',
          boxShadow: 0,
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Absolute layer that uses percentage-based layout */}
        <Box sx={{ position: 'absolute', inset: 0 }}>
          {/* Aggregator Optima (logo/title) */}
          <Typography
            sx={{
              position: 'absolute',
              left: '1.9722%',
              top: '3.2753%',
              width: '25.4808%',
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '32px',
              color: '#000000',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onClick={() => navigate('/')}
          >
            Aggregator Optima
          </Typography>

          {/* First Name */}
          <Typography
            sx={{
              position: 'absolute',
              left: '75.381%',
              top: '4.4599%',
              width: '7.2646%',
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '20px',
              color: '#000000',
            }}
          >
            {userName.firstName}
          </Typography>

          {/* Last Name */}
          <Typography
            sx={{
              position: 'absolute',
              left: '83.1852%',
              top: '4.4913%',
              width: '7.2374%',
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '20px',
              color: '#000000',
            }}
          >
            {userName.lastName}
          </Typography>

          {/* Avatar */}
          <Avatar
            sx={{
              position: 'absolute',
              left: '90.873%',
              top: '1.5331%',
              width: '6.6138%',
              height: '6.9686%',
              background: '#D9D9D9',
              cursor: 'pointer',
              '&:hover': {
                background: '#C9C9C9',
              },
            }}
            onClick={() => navigate('/profile')}
          />

          {/* Filter Text */}
          <Typography
            sx={{
              position: 'absolute',
              left: '4.5906%',
              top: '11.9589%',
              width: '20.9716%',
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '16px',
              color: '#000000',
            }}
          >
            Filter: Time | Range | Dataset
          </Typography>

          {/* Export Data Button */}
          <Button
            variant="text"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={handleExport}
            sx={{
              position: 'absolute',
              left: '87.7255%',
              top: '11.9415%',
              minWidth: 0,
              padding: 0,
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: 1,
              color: '#000000',
              textTransform: 'none',
              '& .MuiButton-startIcon': {
                marginRight: '4px',
              },
              '&:hover': {
                background: 'rgba(0,0,0,0.04)',
              },
            }}
          >
            Export Data
          </Button>

          {/* Metric Cards (Rectangles 1, 2, 3) */}
          <MetricCard
            value="202.1KG o2"
            color="#EC9D00"
            leftPct={14.4841}
            topPct={14.5645}
            widthPct={19.709}
            heightPct={11.1498}
            fontSize={24}
          />
          <MetricCard
            value="33% efficiency"
            color="#E80004"
            leftPct={41.4021}
            topPct={14.5645}
            widthPct={19.709}
            heightPct={11.1498}
            fontSize={30}
          />
          <MetricCard
            value="22%^ Weekly"
            color="#3BB200"
            leftPct={68.3201}
            topPct={14.5645}
            widthPct={19.709}
            heightPct={11.1498}
            fontSize={30}
          />

          {/* Pie Chart (Rectangle 5) */}
          <Box
            sx={{
              position: 'absolute',
              left: '9.7884%',
              top: '30.7317%',
              width: '15.5423%',
              height: '16.3763%',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <img
              src={pieChartImg}
              alt="Pie Chart"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          {/* Heat Map (Rectangle 4) */}
          <Box
            sx={{
              position: 'absolute',
              left: '32.3413%',
              top: '28.8502%',
              width: '37.7646%',
              height: '20.2091%',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <img
              src={heatMapImg}
              alt="US Heat Map"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          {/* Bar Chart (Rectangle 6) */}
          <Box
            sx={{
              position: 'absolute',
              left: '74.8677%',
              top: '32.1254%',
              width: '15.1455%',
              height: '15.9582%',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <img
              src={barChartImg}
              alt="Bar Chart"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          {/* Suggestions Section (Rounded rectangle) */}
          <Paper
            sx={{
              position: 'absolute',
              left: '7.8042%',
              top: '53.2404%',
              width: '86.9048%',
              height: '17.561%',
              border: '1px solid #000000',
              borderRadius: '20px',
              boxShadow: 'none',
              padding: '18px 30px',
              background: '#FFFFFF',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            {/* Suggestions Label + Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: 2 }}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#000000',
                }}
              >
                Suggestions
              </Typography>
              <AutoAwesomeIcon sx={{ fontSize: 24, color: '#000000' }} />
            </Box>

            {/* Suggestion Text */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
              {suggestions.map((suggestion, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '16px',
                    color: '#000000',
                    lineHeight: 1.6,
                    ...(index === 0 && {
                      textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
                    }),
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {suggestion}
                </Typography>
              ))}
            </Box>
          </Paper>

          {/* Bottom Placeholder 1 (Rectangle 32) */}
          <Box
            sx={{
              position: 'absolute',
              left: '7.8042%',
              top: '73.2404%',
              width: '40.6746%',
              height: '15.1916%',
              background: '#D9D9D9',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                color: '#666666',
              }}
            >
              Additional Chart 1
            </Typography>
          </Box>

          {/* Bottom Placeholder 2 (Rectangle 33) */}
          <Box
            sx={{
              position: 'absolute',
              left: '54.0344%',
              top: '73.2404%',
              width: '40.6746%',
              height: '15.1916%',
              background: '#D9D9D9',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                color: '#666666',
              }}
            >
              Additional Chart 2
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
