import {useState} from "react";
// Style
import style from "./style.module.css";
// Firebase
import {firebaseAddTodo, firebaseGetTodos} from "../../firebase";

export default function AddForm({user, setTodos}) {
  // State
  const [value, setValue] = useState("");

  // Add Todo Function
  const addTodo = async (e) => {
    e.preventDefault();
    const valueFiltered = value.trim();
    if (valueFiltered !== "") {
      const timeStamp = new Date().valueOf().toString();
      const response = await firebaseAddTodo(user.uid, valueFiltered, false, timeStamp);
      if (response == "ok") {
        setValue("");
        const responseTodos = await firebaseGetTodos(user.uid);
        setTodos(responseTodos);
      } else {
        alert(response);
      }
    } else {
      alert("Todo alanını boş bırakmayınız!");
    }
  };

  return (
    <div className={style.addFormWrapper}>
      <h1 className={style.title}>Yapılacak birşeyler ekleyin..</h1>
      <form onSubmit={addTodo}>
        <input type="text" placeholder="spor yap.." value={value} onChange={(e) => setValue(e.target.value)} required />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}
