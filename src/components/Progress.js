import { useContext } from "react";
import { ThemesContext } from "../App";

const Progress = () => {
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
      Progress
    </div>
  );
};

export default Progress;
