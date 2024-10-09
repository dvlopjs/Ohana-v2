import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, Chip, Divider, Input, makeStyles } from '@material-ui/core';
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
  ...rest
}) => {
  const classes = useStyles();
  const [selectOptions, setSelectOptions] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [chips, setChips] = useState([]);
  const [filters, setFilters] = useState({
    tipos: [],
    ubicaciones: [],
    categorias: [],
    nombre: ''
  });

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
    setFilters(prev => ({ ...prev, nombre: newValue }));
    applyFilters({ ...filters, nombre: newValue });
  };

  const handleChipDelete = chip => {
    setChips(prevChips => prevChips.filter(prevChip => chip !== prevChip));

    // Actualizar filtros
    const updatedFilters = { ...filters };
    Object.keys(updatedFilters).forEach(key => {
      updatedFilters[key] = updatedFilters[key].filter(item => item !== chip);
    });
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleMultiSelectChange = useCallback(
    (label, selectedOptions) => {
      const filterKey =
        label.toLowerCase() === 'tipo'
          ? 'tipos'
          : label.toLowerCase() === 'ubicación'
          ? 'ubicaciones'
          : 'categorias';

      const updatedFilters = {
        ...filters,
        [filterKey]: selectedOptions
      };

      setFilters(updatedFilters);
      setChips([
        ...new Set([
          ...updatedFilters.tipos,
          ...updatedFilters.ubicaciones,
          ...updatedFilters.categorias
        ])
      ]);
      applyFilters(updatedFilters);
    },
    [filters]
  );

  const applyFilters = useCallback(
    currentFilters => {
      if (onApplyFilters) {
        onApplyFilters(currentFilters);
      }
    },
    [onApplyFilters]
  );

  console.log(filters);
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
            {chips.map(chip => (
              <Chip
                className={classes.chip}
                key={chip}
                label={chip}
                onDelete={() => handleChipDelete(chip)}
              />
            ))}
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
                value={
                  filters[
                    option.label.toLowerCase() === 'tipo'
                      ? 'tipos'
                      : option.label.toLowerCase() === 'ubicación'
                      ? 'ubicaciones'
                      : 'categorias'
                  ]
                }
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
