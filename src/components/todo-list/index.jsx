// Style
import style from "./style.module.css";
// Firebase
import {firabaseDeleteTodo, firebaseUpdateTodo} from "../../firebase";

export default function TodoList({user, todos, setTodos}) {
  
  // Delete Button
  const deleteButton = async (todoId, e) => {
    const response = await firabaseDeleteTodo(user.uid, todoId);
    if (response == "ok") {
      const deleteTodoFromTodos = todos.filter((item) => item.id !== todoId && item.data().todo);
      setTodos(deleteTodoFromTodos);
      alert("Görev silindi!");
    } else {
      alert(response);
    }
  };

  // Completed Todo
  const todoIsCompleted = async (todoId, isComplete, e) => {
    const response = await firebaseUpdateTodo(user.uid, todoId, isComplete ? false : true);
    if (response == "ok") {
      const element = e.target.parentElement.previousSibling;
      const completed = style.todoCompleted;
      element.classList.toggle(completed);
      alert("İşlem başarılı!");
    } else {
      alert(response);
    }
  };

  return (
    <>
      <ul className={style.todosList}>
        <h2>Eklediğiniz Görevler</h2>
        {todos && todos.length > 0 ? (
          todos.map((item, index) => (
            <li key={index}>
              <p className={item.data().isComplete ? style.todoCompleted : ""}>{item.data().todo}</p>
              <div>
                <button className={style.completeButton} onClick={(e) => todoIsCompleted(item.id, item.data().isComplete, e)}>
                  Tamamladım
                </button>
                <button className={style.deleteButton} onClick={(e) => deleteButton(item.id, e)}>
                  Sil
                </button>
              </div>
            </li>
          ))
        ) : (
          <p style={{color: "#f5f5f59e", fontSize: "14px", margin: "24px 0 12px"}}>Henüz bir görev eklemediniz..</p>
        )}
      </ul>
    </>
  );
}
