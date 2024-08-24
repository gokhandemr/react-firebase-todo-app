import {useEffect} from "react";
// Component
import TitleDesc from "../../components/title-desc";
import RegisterForm from "../../components/register-form";
// Router DOM
import {useNavigate} from "react-router-dom";
// Firebase
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";

export default function RegisterPage() {
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
      <TitleDesc title={"Hoş geldiniz.."} desc={"Uygulamayı kullanabilmek için adınızı, e-mail adresinizi ve şifrenizi yazarak kayıt olabilirsiniz. "} />
      <RegisterForm />
    </>
  );
}
