import { useCallback } from "react";
import { useSnackbar } from "notistack";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import theme from "../../theme";
// import { useTranslation } from 'react-i18next';

export const Snackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackbar = useCallback(
    (
      msg,
      variant
    ) => {
      enqueueSnackbar(msg, {autoHideDuration: 5000,});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enqueueSnackbar, closeSnackbar]
  );

  return showSnackbar;
};
