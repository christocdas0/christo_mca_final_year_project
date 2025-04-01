import { styled } from "@mui/system";
import { Button, Card, Select, TableCell, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Container = styled("div")({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#FFF",
  gap: "2rem",
});

const LeftSection = styled(Card)({
  width: "30%",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const RightSection = styled(Card)({
  width: "65%",
  padding: "20px",
});

const Header = styled(Typography)({
  fontWeight: "bold",
});

const FieldContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const Label = styled(Typography)({
  fontWeight: "bold",
});

const StyledDatePicker = styled(DatePicker)({
  width: "100%",
  "& .MuiInputBase-root": {
    backgroundColor: "#fff",
  },
});

const StyledSelect = styled(Select)({
  width: "100%",
  backgroundColor: "#fff",
});

const ButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  flexWrap: "wrap",
});

const StyledButton = styled(Button)({
  flex: 1,
  fontWeight: "bold",
});

const TableHeader = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#E3F2FD",
});

const HeaderContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export {
  Container,
  TableHeader,
  StyledButton,
  ButtonContainer,
  StyledSelect,
  StyledDatePicker,
  Label,
  FieldContainer,
  Header,
  RightSection,
  LeftSection,
  HeaderContainer,
};
