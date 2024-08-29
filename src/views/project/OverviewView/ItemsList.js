import React, { useState, useEffect, useRef } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  CircularProgress,
  Card,
  CardHeader,
  Typography,
  Divider,
  CardContent,
  Box,
  Chip,
  makeStyles
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReactConfetti from 'react-confetti';
import api from './../../../api/Api';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const ItemsList = ({ event, items, setItems }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingItems, setLoadingItems] = useState({}); // Estado para manejar el loading
  const [loadingDisabledItems, setLoadingDisabledItems] = useState(false);
  const firstRender = useRef(true);

  const handleToggle = async (id, currentDoneStatus) => {
    // Configurar el estado de carga para el ítem específico
    setLoadingItems(prev => ({ ...prev, [id]: true }));
    setLoadingDisabledItems(true);

    // Invertir el estado de 'done' y enviar la actualización al servidor
    const newDoneStatus = !currentDoneStatus;
    await api.updateItemStatus(id, newDoneStatus);

    // Actualizar el estado local después de que el servidor haya confirmado la actualización
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, done: newDoneStatus } : item
    );
    setItems(updatedItems);

    // Eliminar el estado de carga después de completar la actualización
    setLoadingItems(prev => ({ ...prev, [id]: false }));
    setLoadingDisabledItems(false);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // Evitar que se muestre el confetti en la primera renderización
    } else {
      const allItemsComplete = items.every(item => item.done);
      if (allItemsComplete) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  }, [items]);

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
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
            {items.map(item => (
              <ListItem key={item.id} dense style={{ padding: '4px 8px' }}>
                <ListItemIcon style={{ minWidth: '30px' }}>
                  {loadingItems[item.id] ? (
                    <CircularProgress size={24} /> // Mostrar spinner de carga
                  ) : (
                    <Checkbox
                      edge="start"
                      checked={item.done}
                      onClick={() =>
                        !loadingDisabledItems &&
                        handleToggle(item.id, item.done)
                      }
                      tabIndex={-1}
                      disableRipple
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box
                      gridGap={10}
                      display={'flex'}
                      alignContent={'center'}
                      alignItems={'center'}
                    >
                      {item.name}

                      <Chip
                        variant="outlined"
                        color="primary"
                        onDelete={() => {}}
                        deleteIcon={
                          item.done ? (
                            <DoneIcon style={{ cursor: 'context-menu' }} />
                          ) : (
                            <ClearIcon style={{ cursor: 'context-menu' }} />
                          )
                        }
                        size="small"
                        label={item.done ? 'Completado' : 'Sin completar'}
                      />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemsList;
