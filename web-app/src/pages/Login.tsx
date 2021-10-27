import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useUser } from '../hooks/useUser';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginError, loginLoading, isLoggedIn } = useUser();

  if (isLoggedIn && !loginLoading) {
    console.log('logged in, go Home!');

    return <Redirect to="/home" />;
  }

  const handleLogin = () => {
    login({ email, password });
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h3" align="center" color="secondary">
            Welcome
          </Typography>

          {loginLoading && (
            <Grid container direction="column" alignContent="center">
              <CircularProgress color="secondary" />
            </Grid>
          )}

          {!loginLoading && (
            <Box component="form">
              <div>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  required
                  type="password"
                  id="password"
                  label="Password"
                  margin="normal"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <Box marginTop="10">
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>

              <Box>
                {loginError && (
                  <Typography id="modal-modal-title">
                    Invalid user, try again please.
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
