import {useEffect, useState} from "react";
// Components
import Header from "../../components/header";
import AddForm from "../../components/add-form";
import TodoList from "../../components/todo-list";
// Firebase
import {onAuthStateChanged} from "firebase/auth";
import {auth, firebaseGetTodos} from "../../firebase";
// Router DOM
import {useNavigate} from "react-router-dom";

export default function UserPage() {
  // States
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  // Navigate
  const navigate = useNavigate();

  // Kullanıcı giriş yapmamış ise  "ana sayfa" ya yönlendir.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else {
        setUser(user);
        // Başlangıçta kullanıcının todo'larını listele
        (async () => {
          const response = await firebaseGetTodos(user.uid);
          setTodos(response);
        })();
      }
    });
  }, []);

  return (
    user && (
      <>
        <Header user={user} />
        <AddForm user={user} setTodos={setTodos} />
        <TodoList user={user} todos={todos} setTodos={setTodos}/>
      </>
    )
  );
}
