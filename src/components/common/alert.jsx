import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

const AutoHideAlert = ({
  message,
  severity,
  open,
  handleClose,
  timeout = 4000,
  variant = "standard",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={timeout}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} variant={variant} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AutoHideAlert;
