import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import PasswordRecoverForm from './PasswordRecoverForm';

const methodIcons = {
  Auth0: '/static/images/auth0.svg',
  FirebaseAuth: '/static/images/firebase.svg',
  JWT: '/static/images/jwt.svg',
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400,
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%',
    },
  },
}));

const PasswordRecoverView = ({ history }) => {
  const classes = useStyles();
  const { method } = useAuth();

  return (
    <Page className={classes.root} title="Recuperar contraseña">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Box mb={1} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h2">
                    Recuperar contraseña
                </Typography>
              </div>
              <div className={classes.currentMethodIcon}>
                <img alt="Método de autenticación" src={methodIcons[method]} />
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              <PasswordRecoverForm history={history} />
            </Box>
            <Box mb={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              color="textSecondary"
            >
              Iniciar sesión
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

PasswordRecoverView.propTypes = {
  history: PropTypes.object.isRequired,
};

export default PasswordRecoverView;