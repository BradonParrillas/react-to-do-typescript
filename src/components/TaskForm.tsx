import "../styles/TaskForm.scss";
import "../styles/TaskForm.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { Task } from "../types";
import printWithColor from "../utilities/printWithColor";

interface TaskFormState {
  inputValues: Task;
}

interface TaskFormProps {
  saveTask: (task: Task) => void;
  task?: Task;
}

const INITIAL_STATE: Task = {
  id: "",
  text: "",
  completed: false,
};

const TaskForm = ({ saveTask, task = INITIAL_STATE }: TaskFormProps) => {
  const [inputValues, setInputValues] =
    useState<TaskFormState["inputValues"]>(task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveTask(inputValues);
    setInputValues(INITIAL_STATE);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    printWithColor("writing...");
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="what is there to do?"
        name="text"
        value={inputValues.text}
        onChange={handleChange}
      />
      <button type="submit" className="save-task">
        <AiOutlinePlus />
      </button>
    </form>
  );
};

export default TaskForm;
