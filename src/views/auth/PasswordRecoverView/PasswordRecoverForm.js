import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  LinearProgress,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import API from '../../../api/Api';
import Countries from '../../../components/Countries';

const STATES = [
  'Buenos Aires', 'Buenos Aires Capital', 'Catamarca', 'Chaco',
  'Chubut', 'Cordoba', 'Corrientes', 'Entre Rios', 'Formosa',
  'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones',
  'Neuquen', 'Rio Negro', 'Salta', 'San Juan', 'San Luis',
  'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
  'Tierra del Fuego', 'Tucuman'
];

const useStyles = makeStyles(() => ({
  root: {},
  div: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    width: '90%',
  },
  span: {
    width: '5%',
  },
  progress: {
    marginTop: '30px',
  },
  autocomplete: {
    width: '90%',
    marginTop: '8px',
  },
}));

const PasswordRecoverForm = ({ history, className, ...rest }) => {
  const classes = useStyles();
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [selectedState, setSelectedState] = useState();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();

  const onStateChange = async (event, selectedState) => {
    setSelectedState(selectedState);
    try {
      const response = await API.getCities(selectedState);
      setCities(response);
    } catch (e) {
      console.error(e);
    }
  };

  const onCityChange = async (event, selectedCity) => {
    setSelectedCity(selectedCity);
  };

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(255, 'El nombre de usuario debe ser menor a 255 caracteres')
            .required('El nombre de usuario es requerido'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setLoader(true);

          try {
            await API.passwordRecover(values.username);
            enqueueSnackbar('Instrucciones para recuperar la contraseña enviadas con éxito.', {
              variant: 'success',
            });
            setStatus({ success: true });
          } catch (err) {
            console.error(err);
            enqueueSnackbar('No se pudo enviar la solicitud, por favor intente nuevamente.', {
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
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
            {...rest}
          >
            <TextField
              error={Boolean(touched.username && errors.username)}
              fullWidth
              helperText={touched.username && errors.username}
              label="Nombre de usuario"
              margin="normal"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
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
                Recuperar Contraseña
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {loader && <LinearProgress className={classes.progress} color="primary" />}
    </div>
  );
};

PasswordRecoverForm.propTypes = {
  className: PropTypes.string,
};

export default PasswordRecoverForm;