import { styled } from "@mui/system";
import { Card, TableContainer, Typography } from "@mui/material";

export const WelcomeText = styled(Typography)({
  color: "#000",
});

export const Container = styled("div")({
  display: "flex",
  width: "95vw",
  height: "90vh",
  backgroundColor: "#FFF",
  padding: "1.9rem",
  gap: "2rem",
});

export const LeftSection = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const RightSection = styled("div")({
  flex: 1,
});
export const TileContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 0.5fr)",
  gap: "2rem",
});

export const Tile = styled(Card)(({ theme, color }) => ({
  width: "12vw",
  height: "12vw",
  padding: "16px",
  textAlign: "center",
  backgroundColor: color || theme.palette.background.paper,
  color: "#000",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #ddd",
}));

export const AttendanceTable = styled(TableContainer)({
  marginTop: "20px",
  maxHeight: "25rem",
  overflow: "auto",
});

export const HeaderContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});
