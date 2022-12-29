import { Task } from "../types";
import TaskElement from "../components/Task";
import { useEffect, useState } from "react";
import printWithColor from "../utilities/printWithColor";
import {
  saveInLocalStorage,
  getFromLocalStorage,
} from "../services/localStorage";
import generateId from "../utilities/idGenerator";
import TaskForm from "./TaskForm";

interface ToDoState {
  tasks: Array<Task>; //* | Task[]
  taskNumber: number;
  editingTask: boolean;
}

const ToDo = () => {
  const [tasks, setTasks] = useState<ToDoState["tasks"]>([]);
  const [taskNumber, setTaskNumber] = useState<ToDoState["taskNumber"]>(0);
  const [editingTask, setEditingTask] =
    useState<ToDoState["editingTask"]>(false);

  useEffect(() => {
    const tasksSaved = getFromLocalStorage();
    setTasks(tasksSaved);
    setTaskNumber(tasksSaved.length);
  }, []);

  const saveTask = (task: Task): void => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      task.completed = false;
      task.id = generateId();
      const updatedTasks: Array<Task> = [task, ...tasks];
      saveInLocalStorage(updatedTasks);
      setTasks(updatedTasks);
      printWithColor("task added", "green");
    }
  };

  const updateTask = (task: Task, id: Task["id"]): void => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      task.completed = false;
      const updatedTasks: Array<Task> = tasks.map((taskItem) => {
        if (taskItem.id === task.id && taskItem.text != task.text) {
          taskItem = task;
        }
        return taskItem;
      });
      saveInLocalStorage(updatedTasks);
      setTasks(updatedTasks);
      printWithColor("task update", "purple");
    }
  };

  const deleteTask = (id: Task["id"]): void => {
    const updatedTasks: Array<Task> = tasks.filter((task) => task.id !== id);
    saveInLocalStorage(updatedTasks);
    setTasks(updatedTasks);
    printWithColor("task deleted", "orange");
  };

  const switchStateTask = (id: Task["id"]): void => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    saveInLocalStorage(updatedTasks);
    setTasks(updatedTasks);
    printWithColor("state of the task switched", "aquamarine");
  };

  return (
    <>
      <h1>My Tasks</h1>
      <TaskForm saveTask={saveTask} />
      <div className="task-list">
        {tasks.map((task) => {
          return (
            <TaskElement
              key={task.id}
              switchStateTask={switchStateTask}
              deleteTask={deleteTask}
              task={task}
            >
              {task.text}
            </TaskElement>
          );
        })}
      </div>
    </>
  );
};

export default ToDo;
