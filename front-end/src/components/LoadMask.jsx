import PropTypes from "prop-types";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadMask({ open }) {
  return (
    <div>
      <Backdrop
        style={{ opacity: "1", visibility: "visible" }}
        sx={(theme) => ({ color: "black", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

LoadMask.propTypes = {
  open: PropTypes.bool,
};
