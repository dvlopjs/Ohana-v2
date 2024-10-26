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
  Typography,
  Switch
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
  },
  switch: {
    marginLeft: theme.spacing(2) // Adds space between MultiSelect and Switch
  },
  switchLabel: {
    marginLeft: theme.spacing(1), // Adds space before the label
    marginRight: theme.spacing(2), // Adds space between the label and the switch
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
  finished,
  setFinished,
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
      { label: 'Tipo', options: ['Monetaria', 'Fisica'] },
      { label: 'Ubicación', options: ['Córdoba', 'Buenos Aires', 'Neuquén', 'Mendoza', 'Salta'] },
      { label: 'Categoría', options: categoriesNames }
    ]);
  }, [categoriesNames]);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories();
      const catNames = response.map(category => category.name);
      setCategoriesNames(catNames);
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleChipDelete = chip => {
    const updatedChips = chips.filter(prevChip => prevChip !== chip);
    setChips(updatedChips);
    const updatedFilters = filters.filter(item => item !== chip);
    setFilters(updatedFilters);
  };

  const handleMultiSelectChange = (label, selectedOptions) => {
    const updatedFilters = [
      ...filters.filter(filter => !selectOptions.find(opt => opt.label === label).options.includes(filter)),
      ...selectedOptions
    ];
    setFilters(updatedFilters);

    const remainingChips = chips.filter(chip => !selectOptions.find(opt => opt.label === label).options.includes(chip));
    setChips([...remainingChips, ...selectedOptions]);
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
            <Box display="flex" flexGrow={1} flexWrap="wrap">
              {selectOptions.map(option => (
                <MultiSelect
                  key={option.label}
                  label={option.label}
                  onChange={selectedOptions => handleMultiSelectChange(option.label, selectedOptions)}
                  options={option.options}
                  value={filters.filter(filter => option.options.includes(filter))}
                />
              ))}
            </Box>

            <Typography className={classes.formControlLabel} variant="body2" color="textPrimary">
              {finished ? 'ACTIVAS' : 'FINALIZADAS'}
            </Typography>

            <Switch
              checked={finished}
              onChange={()=>setFinished(!finished)}
              className={classes.switch}
              color="primary" // You can specify other props as needed
            />
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
  setInputValue: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func,
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default Filter;