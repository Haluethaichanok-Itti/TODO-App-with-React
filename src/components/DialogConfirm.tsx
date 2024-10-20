import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    DialogContentText,
  } from "@mui/material";
  import { FC } from "react";
  
  interface DialogConfirmProps {
    open: boolean;
    onSubmit: () => void;
    onClose: () => void;
    type: string;
  }
  const DialogConfirm: FC<DialogConfirmProps> = ({ open, onSubmit, onClose, type }) => {
    return (
      <Dialog
        open={open}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle>{type === "create" ? "Create Task" :(type === "edit" ? "Edit Task" : "Delete Task")}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
            {`Are you sure you want to ${type} this task?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={type === "delete" ?"error":"primary"} onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            color={type === "delete" ?"error":"primary"}
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            {type === "delete" ? "Delete" :"Save"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DialogConfirm;
  