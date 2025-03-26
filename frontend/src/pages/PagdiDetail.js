import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPagriById } from '../utils/api';

function PagriDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Pagri, setPagri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPagriDetails = async () => {
      try {
        console.log('Fetching Pagri with ID:', id); // Debug log
        const data = await getPagriById(id);
        console.log('Fetched Pagri data:', data); // Debug log
        setPagri(data);
      } catch (error) {
        console.error('Error fetching Pagri details:', error);
        setError('Failed to load Pagri details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPagriDetails();
    } else {
      setError('Invalid Pagri ID');
      setLoading(false);
    }
  }, [id]);

  const handleCloseError = () => {
    setError(null);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!Pagri) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          Pagri not found
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/gallery')}
          sx={{ mt: 2 }}
        >
          Back to Gallery
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/gallery')}
        sx={{ mb: 4 }}
      >
        Back to Gallery
      </Button>

      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              overflow: 'hidden',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <Box
              component="img"
              src={Pagri.image_url}
              alt={Pagri.name}
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.target.src = '/placeholder.jpg';
              }}
            />
          </Paper>
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {Pagri.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Region: {Pagri.region}
          </Typography>

          <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f5f5f5' }}>
            <Typography variant="body1" paragraph>
              {Pagri.description}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Historical Significance
            </Typography>
            <Typography variant="body1" paragraph>
              {Pagri.historical_significance}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Cultural Value
            </Typography>
            <Typography variant="body1" paragraph>
              {Pagri.cultural_value}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              How to Tie
            </Typography>
            <Typography variant="body1" component="div">
              {Pagri.tying_instructions.map((step, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    Step {index + 1}:
                  </Typography>
                  <Typography variant="body1">{step}</Typography>
                </Box>
              ))}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PagriDetail; 