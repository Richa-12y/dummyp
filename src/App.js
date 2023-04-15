import { createContext, useState } from "react";
import "./App.css";
import themes from "./themes.json";
import { Button, Toggle } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import { Input, InputGroup } from "rsuite";
import { DatePicker, Stack } from "rsuite";
import Todo from "./components/Todo";
import Progress from "./components/Progress";
import TaskCompeted from "./components/TaskCompeted";
import { Modal } from "rsuite";
import RemindOutlineIcon from "@rsuite/icons/RemindOutline";

export const ThemesContext = createContext();

const styles = {
  width: 300,
  marginBottom: 10,
};

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
  const [addText, setAddText] = useState("");
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [todoList, setTodoList] = useState(
    JSON.stringify(localStorage.setItem("todo", "HELLO"))
  );
  // console.log(todoList);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(todoList);
  // console.log(addText);

  const addTasktoTodo = () => {
    if (addText === "") {
      handleOpen();
      return;
    }
    let taskDetailsList = {
      progress: [],
      todo: [
        {
          addText: addText,
          date: currentDate,
        },
      ],
      taskdone: [],
    };
    setTodoList(taskDetailsList);
  };

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
            <InputGroup style={styles}>
              <Input
                placeholder="Add Task"
                value={addText}
                onChange={(e) => setAddText(e)}
              />
              <InputGroup.Addon>
                <PlusIcon />
              </InputGroup.Addon>
            </InputGroup>
            <Stack direction="column" alignItems="flex-start" spacing={6}>
              <DatePicker
                format="yyyy-MM-dd HH:mm:ss"
                style={styles}
                onChange={(e) => setCurrentDate(e)}
              />
            </Stack>
            <Button
              color="green"
              appearance="primary"
              style={styles}
              onClick={addTasktoTodo}
            >
              Add Task
            </Button>
          </div>
        </div>
        <div className="todo_container">
          <Todo />
          <Progress />
          <TaskCompeted />
        </div>
      </div>
    </ThemesContext.Provider>
  );
}

export default App;
