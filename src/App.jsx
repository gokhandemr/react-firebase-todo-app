// Router DOM
import {Route, Routes} from "react-router-dom";
// Pages
import HomePage from "./pages/home-page";
import RegisterPage from "./pages/register-page";
import ResetPasswordPage from "./pages/reset-password-page";
import UserPage from "./pages/user-page";
import UserDetails from "./pages/user-details-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user-page" element={<UserPage />} />
      <Route path="/user-details" element={<UserDetails />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
