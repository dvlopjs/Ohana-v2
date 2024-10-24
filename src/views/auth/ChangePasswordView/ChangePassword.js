import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import API from '../../../api/Api';

const useStyles = makeStyles(() => ({
  root: {},
  progress: {
    marginTop: '30px',
  },
}));

const ChangePassword = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pin = queryParams.get('code'); // Get the PIN from query params

  return (
    <div>
      <Formik
        initialValues={{
          newPassword: '',
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string()
            .min(7, 'La contraseña debe tener al menos 7 caracteres')
            .max(255, 'La contraseña debe tener menos de 255 caracteres')
            .required('La nueva contraseña es requerida'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setLoader(true);

          try {
            await API.changePasswordPin(pin, values.newPassword);
            enqueueSnackbar('Contraseña cambiada con éxito.', {
              variant: 'success',
            });
            setStatus({ success: true });
          } catch (err) {
            console.error(err);
            enqueueSnackbar('No se pudo cambiar la contraseña, por favor intente nuevamente.', {
              variant: 'error',
            });
            setStatus({ success: false });
            setErrors({ submit: err.message });
          } finally {
            setSubmitting(false);
            setLoader(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
            {...rest}
          >
            <Typography variant="h6" gutterBottom>
              Cambiar Contraseña
            </Typography>
            <TextField
              fullWidth
              label="PIN"
              value={pin} // Display the PIN from URL
              variant="outlined"
              disabled // Make the PIN field read-only
            />
            <TextField
              error={Boolean(touched.newPassword && errors.newPassword)}
              fullWidth
              helperText={touched.newPassword && errors.newPassword}
              label="Nueva Contraseña"
              margin="normal"
              name="newPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.newPassword}
              variant="outlined"
            />
            <Box mt={2}>
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Cambiar Contraseña
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {loader && <LinearProgress className={classes.progress} color="primary" />}
    </div>
  );
};

ChangePassword.propTypes = {
  className: PropTypes.string,
};

export default ChangePassword;