import {useEffect, useState} from "react";
// Firebase
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase";
// Router DOM
import {useNavigate} from "react-router-dom";
import Header from "../../components/header";
import UserDetailsImage from "../../components/user-details-image";
import UserDetailsForm from "../../components/user-details-form";
import UserDetailsButtons from "../../components/user-details-buttons";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Kullanıcı giriş yapmamışsa anasayfaya yönlendir
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else {
        setUser(user);
      }
    });
  }, []);

  return (
    user && (
      <>
        <Header user={user} />
        <div style={{background: "#00000070", padding: "24px"}}>
          <UserDetailsImage user={user} />
          <UserDetailsForm user={user} />
          <UserDetailsButtons userMail={user.email} />
        </div>
      </>
    )
  );
}
