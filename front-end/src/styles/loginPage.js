import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const FormContainer = styled(Box)({
  width: "100%",
//   maxWidth: "360px",
});

export const LoginHeading = styled(Typography)({
  color: "black",
});

export const ForgotPassword = styled(Typography)({
  textAlign: "right",
  display: "block",
  marginTop: "8px",
  color: "#007bff",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
});

export const RegisterButton = styled(Button)({
  marginTop: "16px",
  fontWeight: "bold",
  color: "black", // Default text color
  border: "2px solid black", // Black border
  "&:hover": {
    backgroundColor: "#007bff",
    color: "white", // Text turns white
  },
});
