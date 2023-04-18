import { useContext } from "react";
import { ThemesContext } from "../App";
import PageNextIcon from "@rsuite/icons/PageNext";

const Progress = ({ setTodoList, todoList }) => {
  const { themes } = useContext(ThemesContext);
  // console.log(themes);

  const iconsDetials = [
    {
      color: "orange",
      appearance: "primary",
      icons: <PageNextIcon />,
      label: "next",
    },
  ];

  const handleClick = (button, todoitems) => {
    let todoListForProgress = JSON.parse(localStorage.getItem("todo"));
    // console.log(todoListForProgress);
    let obj = {
      ...todoListForProgress,
      taskdone: [...todoListForProgress?.taskdone, todoitems],
      progress: todoListForProgress.progress.filter(
        (el) => el.addText !== todoitems.addText
      ),
    };
    localStorage.setItem("todo", JSON.stringify(obj));
    // console.log(obj);
    setTodoList(obj);
  };
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
      {todoList?.progress
        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        ?.map((el, i) => {
          const date1 = new Date(Date.now());
          const date2 = new Date(el.date);
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return (
            <div
              key={i}
              className="stylefortext"
              style={{
                color: `${
                  diffDays < 2
                    ? "red"
                    : diffDays > 2 && diffDays < 5
                    ? "orange"
                    : "green"
                }`,
              }}
            >
              <div>{i + 1}</div>
              <div>{el?.addText}</div>
              <div className="icon_container">
                {iconsDetials?.map((e, index) => {
                  return (
                    <div key={index} onClick={() => handleClick(e, el)}>
                      {e?.icons}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Progress;
