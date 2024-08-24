// Style
import style from "./style.module.css";
// Firebase
import {firebaseSingOut} from "../../firebase";
// Router DOM
import {Link} from "react-router-dom";

export default function Header({user}) {
  const signOutButton = async () => {
    const response = await firebaseSingOut();
    if (response) {
      alert(response);
    } else {
      alert(response);
    }
  };

  return (
    <header className={style.header}>
      <p>
        Merhaba, <strong>{user.displayName ? user.displayName : user.email}</strong>
      </p>
      <div>
        <nav>
          <Link to={"/user-page"}>görevlerim</Link>
          <Link to={"/user-details"}>hesabım</Link>
        </nav>
        <button onClick={signOutButton}>çıkış yap</button>
      </div>
    </header>
  );
}
