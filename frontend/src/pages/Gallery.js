import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  Fade,
  Alert,
  Snackbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getPagris } from '../utils/api';

function Gallery() {
  const [pagris, setPagris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPagris = async () => {
      try {
        const data = await getPagris();
        console.log('Fetched pagris:', data);
        setPagris(data);
      } catch (error) {
        setError('Failed to load pagris. Please try again later.');
        console.error('Error fetching pagris:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPagris();
  }, []);

  const handlePagriClick = (pagriId) => {
    console.log('Clicking pagri with ID:', pagriId);
    if (pagriId) {
      navigate(`/pagris/${pagriId}`);
    } else {
      console.error('No pagri ID available');
    }
  };

  const filteredPagris = pagris.filter(pagri =>
    pagri.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pagri.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
        Gallery of Indian Pagris
      </Typography>
      <Typography variant="h6" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        Explore the diverse styles of turbans from different regions of India
      </Typography>

      {/* Search Bar */}
      <Box sx={{ mb: 6 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or region..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

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

      {/* Grid of Pagris */}
      <Grid container spacing={4}>
        {filteredPagris.map((pagri, index) => (
          <Grid item xs={12} sm={6} md={4} key={pagri._id}>
            <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea onClick={() => handlePagriClick(pagri._id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={pagri.image_url}
                    alt={pagri.name}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {pagri.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Region: {pagri.region}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {pagri.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {filteredPagris.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No pagris found matching your search.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Gallery; 