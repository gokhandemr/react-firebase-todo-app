import {useState} from "react";
// Style
import style from "./style.module.css";
import {firebaseUptadeUserDetails} from "../../firebase";
// Firebase
// import { firebaseUptadeUserDetails } from "../../firebase";

export default function UserDetailsImage({user}) {
  const [photo, setPhoto] = useState("");
  const [isActive, setIsActive] = useState(false);

  const updatePhoto = async (e) => {
    e.preventDefault();
    const filteredPhoto = photo.trim();
    if (filteredPhoto === "") {
      alert("Hata: Dosya adresi boş olamaz.");
    } else {
      const response = await firebaseUptadeUserDetails(user.displayName, photo);
      if (response == "ok") {
        setIsActive(false);
        alert("Resim başarıyla güncellendi..");
      } else {
        alert(response);
      }
    }
  };

  return (
    <div className={style.userImageWrapper}>
      <div>
        {user.photoURL ? (
          <>
            <img src={user.photoURL} alt="user photo" />
          </>
        ) : (
          <div className={style.nonePhoto}>
            <span>?</span>
          </div>
        )}
        <button onClick={() => setIsActive(!isActive)}>resmi değiştir</button>
      </div>

      <div>
        <h1>{user.displayName}</h1>
        {user.emailVerified && <span>Doğrulanmış Kullanıcı</span>}
      </div>

      {isActive && (
        <div className={style.formWrapper}>
          <label>Resmi Değiştir: </label>
          <form onSubmit={updatePhoto}>
            <input
              type="text"
              value={photo}
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
              placeholder="url.."
            />
            <button type="submit">değiştir</button>
          </form>
        </div>
      )}
    </div>
  );
}
