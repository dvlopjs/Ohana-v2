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

const JWTRegister = ({ history, className, ...rest }) => {
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
          email: '',
          username: '',
          password: '',
          first_name: '',
          last_name: '',
          phone: '',
          country: '',
          province: '',
          city: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Debe ingresar un email válido').max(255).required('Email es requerido'),
          username: Yup.string().max(255).required('Usuario es requerido'),
          password: Yup.string().min(7).max(255).required('Contraseña es requerida'),
          first_name: Yup.string().max(255).required('Nombre es requerido'),
          last_name: Yup.string().max(255).required('Apellido es requerido'),
          phone: Yup.string().max(255).required('Teléfono es requerido'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          values.country = 1;
          values.province = selectedState;
          values.city = selectedCity;

          try {
            await API.singUp(values);
            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            setLoader(true);
            enqueueSnackbar('Usuario creado exitosamente.', {
              variant: 'success',
            });
            setTimeout(() => {
              history.replace('/login');
            }, 3000);
          } catch (err) {
            console.error(err);
            if (err.response && err.response.status) {
              enqueueSnackbar('No se pudo crear el usuario, por favor intente nuevamente', {
                variant: 'error',
              });
            }
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
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
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="Correo electrónico"
              margin="normal"
              name="email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              variant="outlined"
            />
            <div className={classes.div}>
              <TextField
                className={classes.textField}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                label="Usuario"
                margin="normal"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                variant="outlined"
              />
              <span className={classes.span} />
              <TextField
                className={classes.textField}
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Contraseña"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
            </div>
            <div className={classes.div}>
              <TextField
                error={Boolean(touched.first_name && errors.first_name)}
                className={classes.textField}
                fullWidth
                helperText={touched.first_name && errors.first_name}
                label="Nombre"
                margin="normal"
                name="first_name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                variant="outlined"
              />
              <span className={classes.span} />
              <TextField
                error={Boolean(touched.last_name && errors.last_name)}
                fullWidth
                className={classes.textField}
                helperText={touched.last_name && errors.last_name}
                label="Apellido"
                margin="normal"
                name="last_name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                variant="outlined"
              />
            </div>
            <div className={classes.div}>
              <TextField
                error={Boolean(touched.phone && errors.phone)}
                className={classes.textField}
                fullWidth
                helperText={touched.phone && errors.phone}
                label="Teléfono"
                margin="normal"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                variant="outlined"
              />
              <span className={classes.span} />
              <Countries />
            </div>
            <div className={classes.div}>
              <Autocomplete
                className={classes.autocomplete}
                options={STATES}
                autoHighlight
                onInputChange={onStateChange}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Seleccione una provincia"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                  />
                )}
              />
              <span className={classes.span} />
              <Autocomplete
                className={classes.autocomplete}
                options={cities}
                autoHighlight
                onInputChange={onCityChange}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Seleccione una ciudad"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                  />
                )}
              />
            </div>
            <Box alignItems="center" display="flex" mt={2} ml={-1}>
              <Checkbox checked name="policy" />
              <Typography variant="body2" color="textSecondary">
                Debe aceptar los{' '}
                <Link component="a" href="#" color="secondary">
                  Términos y Condiciones
                </Link>
              </Typography>
            </Box>
            <Box mt={2}>
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Aceptar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {loader && <LinearProgress className={classes.progress} color="primary" />}
    </div>
  );
};

JWTRegister.propTypes = {
  className: PropTypes.string,
};

export default JWTRegister;