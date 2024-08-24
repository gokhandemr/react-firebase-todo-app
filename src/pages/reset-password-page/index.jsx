import {useEffect} from "react";
// Components
import ResetForm from "../../components/reset-form";
import TitleDesc from "../../components/title-desc";
// Firebase
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";
// Router DOM
import {useNavigate} from "react-router-dom";

export default function ResetPasswordPage() {
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
      <TitleDesc title={"Şifremi Unuttum!"} desc={'E-mail adresinizi yazıp "Şifreyi Sıfırla" butonuna tıklayın ve ardından mail adresinize gelen mail ile şifrenizi sıfırlayın.'} />
      <ResetForm />
    </>
  );
}
