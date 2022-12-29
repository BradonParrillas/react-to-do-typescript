import "../styles/Task.scss";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { Task } from "../types";

interface TaskProps {
  task: Task;
  children: string;
  switchStateTask: (taskID: Task["id"]) => void;
  deleteTask: (taskID: Task["id"]) => void;
}

const TaskElement = ({
  task,
  children,
  switchStateTask,
  deleteTask,
}: TaskProps) => {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div className="task-content" onClick={() => switchStateTask(task.id)}>
        {children}
      </div>
      <div className="task-icon-container" onClick={() => deleteTask(task.id)}>
        <AiFillCloseCircle className="task-icon" />
      </div>
      <div
        className="task-icon-container"
        onClick={() => console.log("editng")}
      >
        <AiFillEdit className="task-icon" />
      </div>
    </div>
  );
};

export default TaskElement;
