import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import PagdiDetail from './pages/PagdiDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Brown color for traditional feel
    },
    secondary: {
      main: '#D2691E', // Darker brown for accents
    },
    background: {
      default: '#FFF8DC', // Cream color for background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#8B4513',
    },
    h2: {
      fontWeight: 600,
      color: '#8B4513',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pagris/:id" element={<PagdiDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 