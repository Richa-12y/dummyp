import { useContext, useState } from "react";
import { ThemesContext } from "../App";
import EditIcon from "@rsuite/icons/Edit";
import PageNextIcon from "@rsuite/icons/PageNext";
import TrashIcon from "@rsuite/icons/Trash";
import { Modal, Button, Placeholder } from "rsuite";
import { Input } from "rsuite";

const Todo = ({ setTodoList, todoList, open, handleClose }) => {
  //  // Use the useContext hook to access the JSON data from the context we are geeting in objet that the reason we desture this

  const { themes } = useContext(ThemesContext);
  // console.log(themes);
  // console.log(todoList.todo);
  const [edit, setEdit] = useState("");
  const [deleted, setDeleted] = useState("");

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
  // console.log(todoList?.todo);
  const handleClick = (button, todoitems) => {
    console.log(button);
    console.log(todoitems);
    if (button.label === "next") {
      console.log("this is next button");
    } else if (button.label === "edit") {
      console.log("this is edit button");
    } else {
      console.log("this is delete button");
    }
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
          <Input placeholder="Default Input" />
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
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
        {todoList?.todo.map((el, i) => {
          return (
            <div key={i} className="stylefortext">
              <div>{i + 1}</div>
              <div> {el.addText}</div>
              <div className="icon_container">
                {iconsDetials.map((e, index) => {
                  return (
                    <div key={index} onClick={() => handleClick(e, el)}>
                      {e.icons}
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
