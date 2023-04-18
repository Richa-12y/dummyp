import { createContext, useState } from "react";
import "./App.css";
import themes from "./themes.json";
import { Button, Toggle } from "rsuite";
import Todo from "./components/Todo";
import Progress from "./components/Progress";
import TaskCompeted from "./components/TaskCompeted";
import { Modal } from "rsuite";
import RemindOutlineIcon from "@rsuite/icons/RemindOutline";
import InputFrom from "./components/InputFrom";

export const ThemesContext = createContext();

function App() {
  // console.log(themes);
  const [selectedThemes, setSelectedThemes] = useState("light");

  // console.log(themes[selectedThemes].body.background);
  // console.log(themes[selectedThemes].body.color);

  const handleThemeChange = (event) => {
    // console.log("hello");
    console.log(event);

    if (event === true) {
      // console.log("hi");
      setSelectedThemes("dark");
    } else {
      // console.log("hii");
      setSelectedThemes("light");
    }
  };
  // console.log(ThemesContext);
  let themData = {
    themes: themes[selectedThemes],
  };
  // console.log(themData);
  const [open, setOpen] = useState(false);
  /**
   * const text = '[ "Ford", "BMW", "Audi", "Fiat" ]';
   * const myArr = JSON.parse(text);
   * o/p=Ford,BMW,Audi,Fiat
   *When receiving data from a web server, the data is always a string.
    Parse the data with JSON.parse(), and the data becomes a JavaScript object.
   */
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todo")) ?? []
  );
  // JSON.stringify(localStorage.setItem("todo", "HELLO"))
  // console.log(todoList);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(todoList);
  // console.log(addText);

  // console.log(currentDate);
  return (
    <ThemesContext.Provider value={themData}>
      <Modal
        backdrop="static"
        role="alertdialog"
        open={open}
        onClose={handleClose}
        size="xs"
      >
        <Modal.Body>
          <RemindOutlineIcon style={{ color: "#ffb300", fontSize: 24 }} />
          You didn't Add task Please Enter your task.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="App"
        style={{
          background: themes[selectedThemes].body.background,
          color: themes[selectedThemes].body.color,
        }}
      >
        <div className="theme_changer_container">
          <Toggle
            size="lg"
            checkedChildren="light"
            unCheckedChildren="dark"
            onChange={handleThemeChange}
          />
        </div>
        <div className="from_container">
          <div
            style={{
              background: themes[selectedThemes].card.background,
              color: themes[selectedThemes].card.color,
              border: themes[selectedThemes].card.border,
              padding: themes[selectedThemes].card.padding,
              borderRadius: themes[selectedThemes].card.borderRadius,
            }}
          >
            <InputFrom handleOpen={handleOpen} setTodoList={setTodoList} />
          </div>
        </div>
        <div className="todo_container">
          <Todo setTodoList={setTodoList} todoList={todoList} />
          <Progress setTodoList={setTodoList} todoList={todoList} />
          <TaskCompeted setTodoList={setTodoList} todoList={todoList} />
        </div>
      </div>
    </ThemesContext.Provider>
  );
}

export default App;
