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
  const [pagri, setPagri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPagriDetails = async () => {
      try {
        console.log('Fetching Pagri with ID:', id);
        const data = await getPagriById(id);
        console.log('Fetched Pagri data:', data);
        console.log('Tying Instructions:', data.tying_instructions);
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

  const renderTyingInstructions = (instructions) => {
    console.log('Rendering instructions:', instructions);
    if (!instructions) {
      console.log('No instructions provided');
      return null;
    }

    if (Array.isArray(instructions)) {
      console.log('Processing array instructions');
      return instructions.map((step, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="primary">
            Step {index + 1}:
          </Typography>
          <Typography variant="body1">{step}</Typography>
        </Box>
      ));
    } else if (typeof instructions === 'string') {
      console.log('Processing string instructions');
      const steps = instructions.split('\n').filter(step => step.trim());
      return steps.map((step, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="primary">
            Step {index + 1}:
          </Typography>
          <Typography variant="body1">{step.replace(/^\d+\.\s*/, '')}</Typography>
        </Box>
      ));
    }
    console.log('Invalid instructions format');
    return null;
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!pagri) {
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

      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/gallery')}
        sx={{ mb: 4 }}
      >
        Back to Gallery
      </Button>

      <Grid container spacing={4}>
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
              src={pagri.image_url}
              alt={pagri.name}
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

        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {pagri.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Region: {pagri.region}
          </Typography>

          <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f5f5f5' }}>
            <Typography variant="body1" paragraph>
              {pagri.description}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Historical Significance
            </Typography>
            <Typography variant="body1" paragraph>
              {pagri.historical_significance}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Cultural Value
            </Typography>
            <Typography variant="body1" paragraph>
              {pagri.cultural_value}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              How to Tie
            </Typography>
            <Box sx={{ mt: 2 }}>
              {renderTyingInstructions(pagri.tying_instructions)}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PagriDetail; 