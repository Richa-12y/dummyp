import { useContext, useState } from "react";
import { ThemesContext } from "../App";
import EditIcon from "@rsuite/icons/Edit";
import PageNextIcon from "@rsuite/icons/PageNext";
import TrashIcon from "@rsuite/icons/Trash";
import { Modal, Button } from "rsuite";
import { Input } from "rsuite";

const Todo = ({ setTodoList, todoList }) => {
  //  // Use the useContext hook to access the JSON data from the context we are geeting in objet that the reason we desture this

  const { themes } = useContext(ThemesContext);
  // console.log(themes);
  // console.log(todoList.todo);
  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState("");
  const [editText, setEditText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const iconsDetials = [
    {
      color: "orange",
      appearance: "primary",
      icons: <EditIcon />,
      label: "edit",
    },
    {
      color: "red",
      icons: <TrashIcon />,
      appearance: "primary",
      label: "delete",
    },
    {
      color: "orange",
      appearance: "primary",
      icons: <PageNextIcon />,
      label: "next",
    },

    // <EditIcon />,
    // <PageNextIcon />,
    // <TrashIcon />,
  ];

  /**
   *
   * @param {*moveItemsToproggressContainer} button
   * @param {*} todoitems
   *
   */
  const moveItemsToproggressContainer = (item, todoitem) => {
    // console.log(item, todoitem);
    let todoListForProgress = JSON.parse(localStorage.getItem("todo"));
    console.log(todoListForProgress);
    let obj = {
      ...todoListForProgress,
      progress: [...todoListForProgress?.progress, todoitem],
      todo: todoListForProgress.todo.filter(
        (el) => el.addText !== todoitem.addText
      ),
    };
    localStorage.setItem("todo", JSON.stringify(obj));
    // console.log(obj);
    setTodoList(obj);
  };
  /**
   *
   * @param {*editTodo} button
   * @param {*} todoitems
   *
   */

  const handleEditTodo = (item, todoItem) => {
    // console.log(item);
    // console.log(todoItem);
    setEdit(todoItem);
    setOpen(true);
  };

  /**
   *
   * @param {*moveItemsToproggressContainer} button
   * @param {*} todoitems
   *
   */
  const handleDeleteTodo = (item, todoitem) => {
    // console.log(item, todoitem);
    let todoListForProgress = JSON.parse(localStorage.getItem("todo"));
    console.log(todoListForProgress);
    let obj = {
      ...todoListForProgress,
      progress: [...todoListForProgress?.progress, todoitem],
      todo: todoListForProgress.todo.filter(
        (el) => el.addText !== todoitem.addText
      ),
    };
    localStorage.setItem("todo", JSON.stringify(obj));
    // console.log(obj);
    setTodoList(obj);
  };
  // console.log(todoList?.todo);

  const handleClick = (button, todoitems) => {
    // console.log(button);
    // console.log(todoitems);
    if (button.label === "next") {
      moveItemsToproggressContainer(button, todoitems);
      console.log("this is next button");
    } else if (button.label === "edit") {
      console.log("this is edit button");
      handleEditTodo(button, todoitems);
    } else {
      console.log("this is delete button");
      handleDeleteTodo(button, todoitems);
    }
  };
  /**
   * Work on onUpadteTodo button
   */
  const onUpadteTodo = () => {
    // console.log("hello");
    let todoListForProgress = JSON.parse(localStorage.getItem("todo"));
    // console.log(todoListForProgress);
    let upadteIndex = todoListForProgress.todo.findIndex(
      (el) => el.addText === edit.addText
    );
    // console.log(upadteIndex);
    todoListForProgress.todo[upadteIndex].addText = editText;
    // console.log(editText);
    localStorage.setItem("todo", JSON.stringify(todoListForProgress));
    setTodoList(todoListForProgress);
    // console.log(todoListForProgress);
    handleClose(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            placeholder="Default Input"
            onChange={(e) => setEditText(e)}
            value={editText}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onUpadteTodo} appearance="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
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
        {todoList?.todo
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
    </>
  );
};

export default Todo;
