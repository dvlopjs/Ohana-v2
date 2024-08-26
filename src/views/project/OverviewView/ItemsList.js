import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Card,
  CardHeader,
  Typography,
  Divider,
  CardContent
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
const ItemsList = ({ event }) => {
  const handleToggle = id => {
    const updatedBienes = event.items.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
  };

  return (
    <Card>
      <CardHeader
        avatar={<AssignmentIcon />}
        title={<Typography variant="h5">Lista de bienes a donar</Typography>}
        subheader={
          <Typography color="textSecondary" variant="body2">
            Selecciona los bienes que ya han sido donados.
          </Typography>
        }
      />
      <Divider />
      <CardContent style={{ padding: '8px' }}>
        <List disablePadding>
          {event.items.map(item => (
            <ListItem
              key={item.id}
              dense
              onClick={() => handleToggle(item.id)}
              style={{ padding: '4px 8px' }} // Reduce padding en los ListItem
            >
              <ListItemIcon style={{ minWidth: '30px' }}>
                {' '}
                {/* Reduce el espacio del ícono */}
                <Checkbox
                  edge="start"
                  checked={item.done}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ItemsList;
