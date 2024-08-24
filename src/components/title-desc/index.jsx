// Style
import style from "./style.module.css";

export default function TitleDesc({title, desc}) {
  return (
    <>
      <h1 className={style.title}>{title}</h1>
      <p className={style.desc}>{desc}</p>
    </>
  );
}
