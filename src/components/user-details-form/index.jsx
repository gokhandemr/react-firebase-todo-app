import {useState} from "react";
// Style
import style from "./style.module.css";
// Firebase
import {firebaseEmailVerification, firebaseUpdateEmail, firebaseUptadeUserDetails} from "../../firebase";
// Router DOM
import {useNavigate} from "react-router-dom";

export default function UserDetailsForm({user}) {
  // State Name
  const [name, setName] = useState(user ? user.displayName : "");
  const [isName, setIsName] = useState(false);
  // State E-mail
  const [email, setEmail] = useState(user ? user.email : "");
  const [isEmail, setIsEmail] = useState(false);
  // Navigate
  const navigate = useNavigate();

  const changePhotoAndName = async (e) => {
    e.preventDefault();
    if (name !== "") {
      const response = await firebaseUptadeUserDetails(name, user.photoURL);
      if (response == "ok") {
        alert("Kullanıcı Adınız Başarıyla Değiştirildi.");
        navigate(0);
        setIsName(false);
      } else {
        alert(response);
      }
    } else {
      alert("İlgili alanları boş bırakmayınız!");
    }
  };

  const changeEmailSubmit = async (e) => {
    e.preventDefault();
    if (email !== "") {
      let password = prompt("Lütfen Şifrenizi Girin", "****");
      if (password !== "") {
        const response = await firebaseUpdateEmail(user.email, email, password);
        if (response == "ok") {
          alert("E-mail adresi başarıyla değiştirildi.");
          navigate(0);
        } else {
          alert(response);
        }
      } else {
        alert("Şifreniz boş veya 6 karakterden az olmamalı!");
      }
    } else {
      alert("İlgili alanları boş bırakmayınız!");
    }
  };

  const emailVerificationButton = async () => {
    const response = await firebaseEmailVerification();
    if (response == "ok") {
      alert("Doğrulama maili adresinize başarıyla gönderildi.");
    } else {
      alert(response);
    }
  };

  return (
    <div className={style.wrapper}>
      {isName ? (
        <div className={style.formWrapper}>
          <form onSubmit={changePhotoAndName}>
            <strong className={style.detailsTitle}>Kullanıcı Adı: </strong>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">okey</button>
          </form>
          <button onClick={() => setIsName(false)}>kapat</button>
        </div>
      ) : (
        <p>
          <span>
            <strong className={style.detailsTitle}>Kullanıcı Adı: </strong>
            {user.displayName}
          </span>
          <button onClick={() => setIsName(true)}>değiştir</button>
        </p>
      )}

      {isEmail ? (
        <div className={style.formWrapper}>
          <form onSubmit={changeEmailSubmit}>
            <strong className={style.detailsTitle}>E-Mail Adresi: </strong>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">okey</button>
          </form>
          <button onClick={() => setIsEmail(false)}>kapat</button>
        </div>
      ) : (
        <p>
          <span>
            <strong className={style.detailsTitle}>E-Mail Adresi: </strong>
            {user.email}
          </span>
          <button onClick={() => setIsEmail(true)}>değiştir</button>
        </p>
      )}

      <p>
        <span>
          <strong className={style.detailsTitle}>Mail Doğrulaması: </strong>
          {user.emailVerified ? "Doğrulanmış" : "Doğrulanmamış"}
        </span>
        {!user.emailVerified && <button onClick={emailVerificationButton}>Hemen Doğrula</button>}
      </p>
    </div>
  );
}
