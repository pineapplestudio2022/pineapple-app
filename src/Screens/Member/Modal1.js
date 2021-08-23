import React from 'react';
import {makeStyles} from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import {Backdrop} from '@material-ui/core';
import {Fade} from '@material-ui/core';
import {Box, Button} from '@material-ui/core';

const usestyle = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionModal() {
  const classes = usestyle();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button type="button" onClick={handleOpen}>
        react-transition-group
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box className={classes.paper}>
            <h2 id="transition-modal-title">TransitionModal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
