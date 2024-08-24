import {useEffect} from "react";
// Router DOM
import {useNavigate} from "react-router-dom";
// Components
import LoginForm from "../../components/login-form";
import TitleDesc from "../../components/title-desc";
// Firebase
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";

export default function HomePage() {
  // Navigate
  const navigate = useNavigate();

  // Kullanıcı giriş yapmışsa "user-page" sayfasına yönlendir
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/user-page");
      }
    });
  }, []);

  return (
    <>
      <TitleDesc title={"Hoş geldiniz.."} desc={"Uygulamayı kullanabilmek için giriş yapın yada kayıt olun.. "} />
      <LoginForm />
    </>
  );
}
