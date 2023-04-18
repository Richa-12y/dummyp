import { useContext } from "react";
import { ThemesContext } from "../App";
const TaskCompeted = ({ setTodoList, todoList }) => {
  const { themes } = useContext(ThemesContext);
  let todoListForProgress = JSON.parse(localStorage.getItem("todo"));

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
      TaskCompeted
      {todoList?.taskdone
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.map((el, i) => {
          return (
            <div
              key={i}
              className="stylefortext"
              style={{
                color: "green",
              }}
            >
              <div>{i + 1}</div>
              <div>{el?.addText}</div>
            </div>
          );
        })}
    </div>
  );
};

export default TaskCompeted;
