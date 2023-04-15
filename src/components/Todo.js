import { useContext } from "react";
import { ThemesContext } from "../App";

const Todo = () => {
  //  // Use the useContext hook to access the JSON data from the context we are geeting in objet that the reason we desture this

  const { themes } = useContext(ThemesContext);
  // console.log(themes);
  return (
    <div
      style={{
        background: themes.card.background,
        color: themes.card.color,
        border: themes.card.border,
        padding: themes.card.padding,
        borderRadius: themes.card.borderRadius,
      }}
    >
      Todo
    </div>
  );
};

export default Todo;
