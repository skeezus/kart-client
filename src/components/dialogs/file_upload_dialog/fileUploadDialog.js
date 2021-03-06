import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import './fileUploadDialog.css';


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
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  fileInput: {
    margin: theme.spacing(10),
    padding: theme.spacing(10),
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

function FileUploadDialog(props) {
    const [open, setOpen] = useState(false);
    //const fileRef = React.createRef();

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
        // <input type='file' onChange={(e)=>this.onChange(e,this.props)} ref={this.fileRef} style={{display:"none"}} />
        <Dialog open={open}>
            <DialogTitle id="customized-dialog-title" onClose={closeDialog}>{props.dialogName}</DialogTitle>
            <div>
                <input type="file" className="fileInput" onChange={props.fileChangeHandler} />
            </div>
            <DialogActions style={{justifyContent: 'center'}}>
                <Button autoFocus onClick={props.uploadHandler} variant="contained" color="primary">
                    Upload File
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function openFileUploadDialog() {
    openDialogFn();
}

export function closeFileUploadDialog() {
    closeDialogFn();
}

export default FileUploadDialog;
