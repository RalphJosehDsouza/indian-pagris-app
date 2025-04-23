import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import { Favorite, ArrowBack } from '@mui/icons-material';
import { getPagriById } from '../utils/api';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        const pagris = await Promise.all(
          favoriteIds.map(id => getPagriById(id).catch(() => null))
        );
        setFavorites(pagris.filter(pagri => pagri !== null));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
      setLoading(false);
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = (pagriId) => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = currentFavorites.filter(id => id !== pagriId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(prev => prev.filter(pagri => pagri._id !== pagriId));
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography>Loading favorites...</Typography>
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          No favorites yet
        </Typography>
        <Button variant="contained" onClick={() => navigate('/gallery')}>
          Browse Gallery
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/gallery')}>
          Back to Gallery
        </Button>
        <Typography variant="h4">Favorites</Typography>
      </Box>

      <Grid container spacing={3}>
        {favorites.map(pagri => (
          <Grid item xs={12} sm={6} md={4} key={pagri._id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={pagri.image_url}
                alt={pagri.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {pagri.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pagri.region}
                    </Typography>
                  </Box>
                  <IconButton 
                    color="error"
                    onClick={() => handleRemoveFavorite(pagri._id)}
                    sx={{ mt: -1, mr: -1 }}
                  >
                    <Favorite />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites; 