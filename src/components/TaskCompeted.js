import { useContext } from "react";
import { ThemesContext } from "../App";
const TaskCompeted = () => {
  const { themes } = useContext(ThemesContext);
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
    </div>
  );
};

export default TaskCompeted;
