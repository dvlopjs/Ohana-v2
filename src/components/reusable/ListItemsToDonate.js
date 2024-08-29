import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';

const useStyles = makeStyles({
  list: {
    maxHeight: '240px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '10px',
      border: '2px solid #f1f1f1'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555'
    }
  }
});
export const ListItemsToDonate = ({ event }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {event.items_complete.map((x, i) => (
        <ListItem key={i}>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText
            primary={x.name}
            secondary={
              x.done ? (
                <span style={{ color: '#80ed99', fontSize: '0.7rem' }}>
                  DONADO
                </span>
              ) : (
                <span style={{ color: '#f95738', fontSize: '0.7rem' }}>
                  FALTA DONAR
                </span>
              )
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
