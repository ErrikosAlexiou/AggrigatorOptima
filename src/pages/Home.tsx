import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#FFFFFF' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '21px 27px 21px 27px',
          position: 'relative',
        }}
      >
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: '100px',
              height: '100px',
              background: '#D9D9D9',
            }}
          />
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '48px',
              lineHeight: '58px',
              color: '#000000',
            }}
          >
            Aggrigator Optima
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={() => navigate('/login')}
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '24px',
              color: '#000000',
              textTransform: 'none',
            }}
          >
            Sign Up/Login
          </Button>
          <Button
            sx={{
              width: '180px',
              height: '62px',
              background: '#D9D9D9',
              borderRadius: '20px',
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '29px',
              color: '#000000',
              textTransform: 'none',
              '&:hover': {
                background: '#C9C9C9',
              },
            }}
          >
            contact sales
          </Button>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            marginTop: '60px',
            marginBottom: '120px',
          }}
        >
          <Box sx={{ flex: 1, maxWidth: '656px' }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '30px',
                lineHeight: '36px',
                color: '#000000',
                marginBottom: '24px',
              }}
            >
              Turn Environmental Performance into Competitive Advantage
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '29px',
                color: '#000000',
                marginBottom: '32px',
              }}
            >
              Aggrigator Optima gives your business data-driven, contextualised
              insights that show exactly how to improve environmental
              performance—without guesswork.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                sx={{
                  width: '202px',
                  height: '50px',
                  background: '#D9D9D9',
                  borderRadius: '20px',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '24px',
                  color: '#000000',
                  textTransform: 'none',
                  '&:hover': {
                    background: '#C9C9C9',
                  },
                }}
              >
                Get Early Access
              </Button>
              <Button
                sx={{
                  width: '202px',
                  height: '50px',
                  background: '#D9D9D9',
                  borderRadius: '20px',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '24px',
                  color: '#000000',
                  textTransform: 'none',
                  '&:hover': {
                    background: '#C9C9C9',
                  },
                }}
              >
                See How It Works
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: '323px',
              height: '383px',
              background: '#D9D9D9',
              borderRadius: '24px',
              flexShrink: 0,
            }}
          />
        </Box>

        {/* Problem/Solution Section */}
        <Box sx={{ marginBottom: '120px' }}>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '30px',
              lineHeight: '36px',
              color: '#000000',
              marginBottom: '32px',
            }}
          >
            Sustainability Efforts Fail Without Clear, Actionable Data
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '29px',
              color: '#000000',
              maxWidth: '881px',
            }}
          >
            Most businesses want to perform better environmentally—but don't
            know where to start. Scattered data, vague guidelines, and generic
            advice lead to stalled progress and missed opportunities. Aggrigator
            Optima changes that by delivering precise insights, tailored to your
            operations, industry, and impact goals.
          </Typography>
        </Box>

        {/* Features Section */}
        <Box sx={{ marginBottom: '120px' }}>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '30px',
              lineHeight: '36px',
              color: '#000000',
              marginBottom: '64px',
            }}
          >
            Your Environmental Impact, Translated into Clear Action
          </Typography>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            <Grid>
              <Card
                sx={{
                  width: { xs: '100%', sm: '506px' },
                  maxWidth: '506px',
                  height: '562px',
                  background: '#D9D9D9',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flex: 1, padding: '40px' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                      marginBottom: '24px',
                    }}
                  >
                    Contextualised Recommendations
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                    }}
                  >
                    Get improvement suggestions based on your actual data—not
                    generic sustainability checklists.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
              <Card
                sx={{
                  width: { xs: '100%', sm: '506px' },
                  maxWidth: '506px',
                  height: '562px',
                  background: '#D9D9D9',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flex: 1, padding: '40px' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                      marginBottom: '24px',
                    }}
                  >
                    Performance Benchmarking
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                    }}
                  >
                    See how you compare within your industry and identify gaps
                    worth closing.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
              <Card
                sx={{
                  width: { xs: '100%', sm: '506px' },
                  maxWidth: '506px',
                  height: '562px',
                  background: '#D9D9D9',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flex: 1, padding: '40px' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                      marginBottom: '24px',
                    }}
                  >
                    Predictive Insights
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                    }}
                  >
                    Forecast environmental impact trends and act before problems
                    grow.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
              <Card
                sx={{
                  width: { xs: '100%', sm: '506px' },
                  maxWidth: '506px',
                  height: '562px',
                  background: '#D9D9D9',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flex: 1, padding: '40px' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                      marginBottom: '24px',
                    }}
                  >
                    Unified Data Hub
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                    }}
                  >
                    Combine data from multiple sources into one clear, intuitive
                    dashboard.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

