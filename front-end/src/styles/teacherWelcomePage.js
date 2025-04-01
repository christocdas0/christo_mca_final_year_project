import { styled } from "@mui/system";
import { Card, Typography } from "@mui/material";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  // backgroundColor: "#f9f9f9",
  background: `linear-gradient(to right, #fe4fdb, #426f71)`,
});

const AdminContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  background: `linear-gradient(to right,rgb(216, 231, 127),rgb(224, 78, 212))`,
});

const WelcomeText = styled(Typography)({
  marginBottom: "24px",
  fontWeight: "bold",
  color: "#333",
});

const TileContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
});

const AdminTileContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
});

const Tile = styled(Card)({
  width: "200px",
  height: "120px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#E3F2FD",
  color: "#1976D2",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#BBDEFB",
  },
});

const TileText = styled(Typography)({
  textAlign: "center",
  fontWeight: "bold",
});

const HeaderContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export {
  Container,
  WelcomeText,
  TileContainer,
  Tile,
  TileText,
  HeaderContainer,
  AdminTileContainer,
  AdminContainer,
};
