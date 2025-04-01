import { styled, keyframes } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const slideAnimation = keyframes`
  0% { opacity: 0; transform: translateX(100%); }
  50% { opacity: 0.5; transform: translateX(0%); }
  100% { opacity: 1; }
`;
export const Container = styled(Box)(({ theme, bgImage }) => ({
  display: "flex",
  height: "100vh",
  width: "100vw",
  position: "relative",
  alignItems: "center",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(4px)", // Adjust blur intensity
    zIndex: -1,
    animation: `${slideAnimation} 1s ease-in-out`, // Apply sliding effect
  },
}));

export const LeftSection = styled(Box)(({ theme }) => ({
  flex: 0.3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  backgroundColor: "rgba(255, 255, 255, 0.7)", // Light transparent white background
  backdropFilter: "blur(5px)", // Adds blur effect
  boxShadow: "4px 0 10px rgba(0, 0, 0, 0.2)", // Soft shadow
  height: "85%",
  marginLeft: "2rem",
  borderRadius: "1rem",
}));

export const RightSection = styled(Box)(({ theme }) => ({
  flex: 0.7,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  height: "75%",
  marginLeft: "2rem",
  borderRadius: "1rem",
}));

export const HeaderText = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem", // Large for emphasis
  fontWeight: "bold", // Bold for clarity
  color: "#222", // Darker shade for readability
  textTransform: "uppercase", // Gives a structured look
  letterSpacing: "1.5px", // Improves readability
  textAlign: "center", // Ensures alignment
  padding: "12px 24px", // Adds spacing for better layout
  borderRadius: "8px", // Smooth rounded corners
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Subtle background to make it stand out
  boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
  backdropFilter: "blur(3px)", // Optional: Adds a slight glass effect
  display: "inline-block", // Prevents stretching across full width
}));
