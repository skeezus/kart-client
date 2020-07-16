import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';


let openDialogFn;
let closeDialogFn;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root}>
      <Typography className={classes.title}>{children}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
    </MuiDialogTitle>
  );
});

function ListDialog(props) {
    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }

    useEffect(() => { // Similar to componentDidMount and componentDidUpdate:
        openDialogFn = openDialog;
        closeDialogFn = closeDialog;
    });

    return (
        <Dialog open={open}>
          <DialogTitle id="customized-dialog-title" onClose={closeDialog}>{props.dialogName}</DialogTitle>
          <List>
              <Divider />
              {props.lists.map((list) => (
                  <div key={list.id}>
                    <ListItem button onClick={list.handler}>
                        <ListItemText primary={list.primaryText} secondary={list.secondaryText}/>
                    </ListItem>
                    <Divider />
                  </div>
              ))}
          </List>
        </Dialog>
    );
}

export function openListDialog() {
    openDialogFn();
}

export function closeListDialog() {
    closeDialogFn();
}

export default ListDialog;
