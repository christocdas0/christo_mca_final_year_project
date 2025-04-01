import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   width: "100%",
  //   maxWidth: 400,
  //   padding: theme.spacing(4),
  //   backgroundColor: "rgba(255, 255, 255, 0.85)",
  //   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  //   borderRadius: "1rem",
  //   backdropFilter: "blur(8px)", // Subtle blur effect
  //   margin: "auto",
  //   marginTop: theme.spacing(8),
  width: "100%",
  //   maxWidth: "360px",
}));

export const RegisterButton = styled(Button)({
  marginTop: "16px",
  fontWeight: "bold",
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
  },
});
export const RegisterHeading = styled(Typography)({
  color: "black",
});

export const LoginRedirect = styled(Typography)({
  marginTop: "16px",
  fontSize: "14px",
  color: "#333",
  "& a": {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
