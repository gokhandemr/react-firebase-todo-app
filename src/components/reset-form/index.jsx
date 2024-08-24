import {useState} from "react";
// Style
import style from "./style.module.css";
// Firebase
import {firebaseResetPassword} from "../../firebase";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    const filteredEmail = email.trim();
    if (filteredEmail !== "") {
      const response = await firebaseResetPassword(email);
      if (response == "ok") {
        alert("Şifre sıfırlama bağlantısı mail adresinize gönderildi..");
      } else {
        alert(response);
      }
    } else {
      alert("E-mail alanını boş bırakmayınız!!");
    }
  };

  return (
    <form onSubmit={resetPassword} className={style.resetFormWrapper}>
      <div>
        <label>email: </label>
        <input type="email" placeholder="e-mail adresiniz.." value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Şifreyi Sıfırla</button>
    </form>
  );
}
