import React, { useState } from "react";
import PlusIcon from "@rsuite/icons/Plus";
import { Button, Input, InputGroup } from "rsuite";
import { DatePicker, Stack } from "rsuite";

const styles = {
  width: 300,
  marginBottom: 10,
};
const InputFrom = ({ setTodoList, handleOpen }) => {
  const [addText, setAddText] = useState("");
  const [presetntDate, setPresetntDate] = useState(Date.now());

  const addTasktoTodo = () => {
    if (!JSON.parse(localStorage.getItem("todo"))) {
      if (addText === "") {
        handleOpen();
        return;
      }
      let taskDetailsList = {
        progress: [],
        todo: [
          {
            addText: addText,
            date: presetntDate,
          },
        ],
        taskdone: [],
      };

      /**
     * A common use of JSON is to exchange data to/from a web server.
    
    When sending data to a web server, the data has to be a string.
    
    Convert a JavaScript object into a string with JSON.stringify().
    * 
    const obj = {name: "John", age: 30, city: "New York"};
    const myJSON = JSON.stringify(obj); o/p:={"name":"John","age":30,"city":"New York"}
    */
      localStorage.setItem("todo", JSON.stringify(taskDetailsList));
      setTodoList(taskDetailsList);
    } else {
      let savedTodoList = JSON.parse(localStorage.getItem("todo"));
      localStorage.setItem(
        "todo",
        JSON.stringify({
          ...savedTodoList,
          todo: [
            ...savedTodoList.todo,
            { addText: addText, date: presetntDate },
          ],
        })
      );
      setTodoList({
        ...savedTodoList,
        todo: [...savedTodoList.todo, { addText: addText, date: presetntDate }],
      });
      console.log(savedTodoList);
    }
    // // Retrieve the current value of the array from localStorage
    // const savedTodoList = JSON.parse(localStorage.getItem("todo"));
    // // Modify the array by using the push method to add the new element
    // savedTodoList.todo.push({ addText: addText, date: presetntDate });
    // // Store the updated array back into localStorage
    // localStorage.setItem("todo", JSON.stringify(savedTodoList));
    // console.log(savedTodoList);
  };

  return (
    <>
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
          onChange={(e) => setPresetntDate(e)}
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
    </>
  );
};

export default InputFrom;
