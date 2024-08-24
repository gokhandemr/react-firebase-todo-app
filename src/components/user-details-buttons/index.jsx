// Style
import style from "./style.module.css";
// Firebase
import {firebaseDeleteUser, firebaseSingOut, firebaseUpdatePassword} from "../../firebase";

export default function UserDetailsButtons({userMail}) {
  
  const changePasswordButton = async (e) => {
    e.preventDefault();
    let oldPassword = prompt("Şifrenizi değiştirebilmek için lütfen mevcut olan şifrenizi girin.").trim();
    let newPassword = prompt("Lütfen Yeni Şifrenizi Girin", "****").trim();

    if (newPassword !== "" || oldPassword !== "") {
      const response = await firebaseUpdatePassword(userMail, oldPassword, newPassword);
      if (response == "ok") {
        alert("Şifreniz Başarıyla Güncellendi. Lütfen Tekrar Giriş Yapınız.");
        await firebaseSingOut();
      } else {
        alert(response);
      }
    } else {
      alert("Şifreniz boş veya 6 karakterden az olamaz!");
    }
  };

  const deleteUserButton = async () => {
    let oldPassword = prompt("Hesabınızı silebilmek için lütfen mevcut olan şifrenizi girin.").trim();

    if (oldPassword !== "") {
      const response = await firebaseDeleteUser(userMail, oldPassword);
      if (response == "ok") {
        alert("Hesabınız başarılı bir şekilde silindi.");
      } else {
        alert(response);
      }
    } else {
      alert("Şifreniz boş ve 6 karakterden olamaz!");
    }
  };

  return (
    <div className={style.wrapper}>
      <button onClick={changePasswordButton}>Şifremi Değiştir</button>
      <button onClick={deleteUserButton}>Hesabımı Sil</button>
    </div>
  );
}
