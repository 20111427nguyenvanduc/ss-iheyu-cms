import React from 'react';
import { Container, Typography, Box } from '@mui/material';

class NotFound extends React.Component {
  render() {
    return (
      <Container>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="90vh">
          <Typography variant="h1" component="h1" gutterBottom>
            {this.props.title || '404'}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Nội dung đang được phát triển
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default NotFound;
