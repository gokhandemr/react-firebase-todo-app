import React, {useState} from "react";
// Router DOM
import {useNavigate} from "react-router-dom";
// Style
import style from "./style.module.css";
// Firebase
import {firebaseRegisterSubmit} from "../../firebase";

export default function RegisterForm() {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  // Navigate
  const navigate = useNavigate();

  const registerSubmit = async (e) => {
    e.preventDefault();
    const filteredName = name.trim();
    const filteredEmail = email.trim();
    const filteredPassword = password.trim();
    const FilteredPasswordAgain = passwordAgain.trim();

    if (filteredName || filteredEmail || filteredPassword) {
      if (filteredPassword === FilteredPasswordAgain) {
        const response = await firebaseRegisterSubmit(name, email, password);
        if (response == "ok") {
          alert("Başarıyla kayıt olundu.");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          alert(response);
        }
      } else {
        alert("Şifreler uyuşmuyor!");
      }
    } else {
      alert("Lütfen tüm zorunlu alanları doldurunuz..");
    }
  };

  return (
    <form onSubmit={registerSubmit} className={style.registerFormWrapper}>
      <label>Ad</label>
      <input placeholder="John Doe" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Email</label>
      <input placeholder="e-mail adresiniz" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Şifre</label>
      <input placeholder="****" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Şifre Tekrar</label>
      <input placeholder="****" type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
      <button type="submit">Kayıt Ol</button>
    </form>
  );
}
