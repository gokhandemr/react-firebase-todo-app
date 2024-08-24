import {useState} from "react";
// Router DOM
import {Link} from "react-router-dom";
// Style
import style from "./style.module.css";
// Firabase
import {firebaseGoogleLogin, firebaseLogin} from "../../firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailFiltered = email.trim();
    const passwordFiltered = password.trim();
    if ((emailFiltered !== "") & (passwordFiltered !== "")) {
      const response = await firebaseLogin(email, password);
      if (response.email) {
        alert("Giriş yapıldı..");
      } else {
        alert(response);
      }
    } else {
      alert("İlgili alanları boş bırakmayınız!");
    }
  };

  const googleLoginButton = async () => {
    const response = await firebaseGoogleLogin();
    if (response == "ok") {
      alert("Giriş yapıldı");
    } else {
      alert(response);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.formWrapper}>
        <div>
          <label>E-mail</label>
          <input placeholder="e-mail adresiniz" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Şifre</label>
          <input placeholder="****" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit">Giriş Yap</button>
          <Link to={"/reset-password"}>Şifremi Unuttum</Link>
        </div>
      </form>

      <div className={style.formWrapperBottom}>
        <button className={style.googleLoginButton} onClick={googleLoginButton}>
          Google ile Giriş Yap
        </button>
        {"yada"}
        <Link className={style.registerLink} to={"/register"}>
          Kayıt Ol
        </Link>
      </div>
    </>
  );
}
