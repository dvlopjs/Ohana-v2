import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Chip,
  Divider,
  Input,
  makeStyles,
  Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from './MultiSelect';
import api from '../../../../api/Api';

const useStyles = makeStyles(theme => ({
  root: {},
  searchInput: {
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const Filter = ({
  className,
  onlyName,
  inputValue,
  setInputValue,
  onApplyFilters,
  filters,
  setFilters,
  ...rest
}) => {
  const classes = useStyles();
  const [selectOptions, setSelectOptions] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectOptions([
      {
        label: 'Tipo',
        options: ['Monetaria', 'Fisica']
      },
      {
        label: 'Ubicación',
        options: ['Córdoba', 'Buenos Aires', 'Neuquén', 'Mendoza', 'Salta']
      },
      {
        label: 'Categoría',
        options: categoriesNames
      }
    ]);
  }, [categoriesNames]);

  const fetchCategories = async () => {
    try {
      let response = await api.getCategories();
      const catNames = response.map(category => category.name);
      setCategoriesNames(catNames);
    } catch (e) {
      console.error(e);
    }
  };
  const handleInputChange = event => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  const handleChipDelete = chip => {
    setChips(prevChips => prevChips.filter(prevChip => chip !== prevChip));

    const updatedFilters = filters.filter(item => item !== chip);

    setFilters(updatedFilters);
  };
  const handleMultiSelectChange = (label, selectedOptions) => {
    // Actualizar filtros eliminando las opciones no seleccionadas del grupo actual
    const updatedFilters = [
      ...filters.filter(
        filter =>
          !selectOptions
            .find(opt => opt.label === label)
            .options.includes(filter)
      ),
      ...selectedOptions
    ];

    setFilters(updatedFilters);

    // Actualizar los chips:
    // 1. Filtrar los chips del grupo actual (basado en el label)
    const remainingChips = chips.filter(
      chip =>
        !selectOptions.find(opt => opt.label === label).options.includes(chip)
    );

    // 2. Combinar los chips que quedan con las nuevas selecciones
    const finalChips = [...remainingChips, ...selectedOptions];

    setChips(finalChips);
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={2} display="flex" alignItems="center">
        <SearchIcon />
        <Input
          disableUnderline
          fullWidth
          className={classes.searchInput}
          onChange={handleInputChange}
          placeholder="Nombre campaña"
          value={inputValue}
        />
      </Box>
      {!onlyName && (
        <div>
          <Divider />
          <Box p={2} display="flex" alignItems="center" flexWrap="wrap">
            {!chips.length ? (
              <Typography variant="body2" color="textSecondary">
                Comienza a agregar los filtros que necesites...
              </Typography>
            ) : (
              chips.map(chip => (
                <Chip
                  className={classes.chip}
                  key={chip}
                  label={chip}
                  onDelete={() => handleChipDelete(chip)}
                />
              ))
            )}
          </Box>

          <Divider />
          <Box display="flex" alignItems="center" flexWrap="wrap" p={1}>
            {selectOptions.map(option => (
              <MultiSelect
                key={option.label}
                label={option.label}
                onChange={selectedOptions =>
                  handleMultiSelectChange(option.label, selectedOptions)
                }
                options={option.options}
                value={filters.filter(filter =>
                  option.options.includes(filter)
                )}
              />
            ))}
          </Box>
        </div>
      )}
    </Card>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
  onlyName: PropTypes.bool,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
  onApplyFilters: PropTypes.func
};

export default Filter;
