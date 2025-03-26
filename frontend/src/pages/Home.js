import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Discover India's Rich Turban Heritage
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              Explore the diverse styles, traditions, and cultural significance of Indian turbans
            </Typography>
            <Button
              component={Link}
              to="/gallery"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#8B4513',
                '&:hover': {
                  backgroundColor: '#654321',
                },
                mr: 2,
              }}
            >
              Explore Gallery
            </Button>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography variant="h3" component="h2" sx={{ mb: 4, fontWeight: 700 }}>
                  About Indian Turbans
                </Typography>
                <Typography variant="body1" paragraph>
                  Indian turbans, known as pagris or dastars, are more than just headwear. They are symbols of honor, dignity, and cultural identity. Each region of India has its unique style of turban, reflecting the rich diversity of our cultural heritage.
                </Typography>
                <Typography variant="body1" paragraph>
                  From the royal safas of Rajasthan to the ceremonial petas of Karnataka, each turban style tells a story of tradition, craftsmanship, and cultural significance.
                </Typography>
                <Button
                  component={Link}
                  to="/about"
                  variant="contained"
                  sx={{
                    backgroundColor: '#8B4513',
                    '&:hover': {
                      backgroundColor: '#654321',
                    },
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  component="img"
                  src="/about-image.jpg"
                  alt="Indian Turban"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" component="h2" sx={{ mb: 4, fontWeight: 700 }}>
            Ready to Explore?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Discover the rich heritage of Indian turbans in our comprehensive gallery
          </Typography>
          <Button
            component={Link}
            to="/gallery"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#8B4513',
              '&:hover': {
                backgroundColor: '#654321',
              },
            }}
          >
            View Gallery
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home; 