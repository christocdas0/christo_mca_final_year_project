import { useEffect, useState } from "react";
import {
  Container,
  LeftSection,
  RightSection,
  HeaderText,
} from "../styles/landingPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useSelector } from "react-redux";

// import bg1 from "../assets/images/landing_bg.jpg";
import bg2 from "../assets/images/landing_bg_1.jpg";
// import bg3 from "../assets/images/landing_bg_2.jpg";
// import bg4 from "../assets/images/landing_bg_3.jpg";
import ForgotPassword from "./ForgotPassword";

// const images = [bg1, bg2, bg3, bg4];
const images = [bg2];

function LandingPage() {
  const showLoginPage = useSelector(
    (state) => state.onlineAttendanceMangement
  )?.showLoginPage;
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container bgImage={images[bgIndex]}>
      <LeftSection>
        {showLoginPage ? <LoginPage /> : <RegisterPage />}
      </LeftSection>
      <RightSection>
        <HeaderText>Online Attendance Management System</HeaderText>
      </RightSection>
      <ForgotPassword />
    </Container>
  );
}

export default LandingPage;
