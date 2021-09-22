import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import TaskForm from "./TaskForm";
import "./TaskList.css";

export default function TaskList({ tasks, onRemove, updateTask }) {
  const [selectedTask, setSelectedTask] = useState({});
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const [nameTask, setTaskName] = useState();
  const [taskDes, setTaskDes] = useState();
  const [taskDueDate, setTaskDueDate] = useState();
  const [taskPriority, setTaskPriority] = useState();

  const onDetail = useCallback(
    (task) => {
      if (selectedTask.createdAt === task.createdAt) {
        setSelectedTask({});
      } else {
        setTaskName(task.taskName);
        setTaskDes(task.taskDes);
        setTaskDueDate(task.taskDueDate);
        setTaskPriority(task.taskPriority);
        setSelectedTask(task);
      }
    },
    [selectedTask]
  );

  const onChangeCheckbox = ({ checked, task }) => {
    if (checked) {
      setCheckedBoxes([...checkedBoxes, task.createdAt]);
    } else {
      const newCheckedBoxes = checkedBoxes.filter(
        (task) => task.createdAt !== task.createdAt
      );
      setCheckedBoxes(newCheckedBoxes);
    }
  };
  
  useEffect(() => {
    if (!tasks.length) setSelectedTask({});
  }, [tasks.length]);

  return (
    <div className="taskList">
      {tasks.map((task) => {
        const { taskName, createdAt } = task;
        const nameShow =
          taskName.length > 50 ? taskName.slice(0, 60) + "..." : taskName;
        return (
          <div className="taskItem--container" key={createdAt}>
            <div className="taskItem--header">
              <input
                type="checkbox"
                className="taskItem--header__checkbox"
                onChange={(e) =>
                  onChangeCheckbox({
                    checked: e.target.checked,
                    task,
                  })
                }
              />
              <div className="taskItem--header__title">{nameShow}</div>
              <Button
                className="taskItem--header__button"
                title="Detail"
                onClick={() => onDetail(task)}
                style={{
                  backgroundColor: "#9f72bf",
                  marginRight: 10,
                }}
              />
              <Button
                className="taskItem--header__button"
                title="Remove"
                onClick={() => onRemove(createdAt)}
                style={{
                  backgroundColor: "red",
                }}
              />
            </div>
            {selectedTask.createdAt && selectedTask.createdAt === createdAt && (
              <div key={createdAt} className="taskItem--body">
                <TaskForm
                  taskName={nameTask}
                  taskDes={taskDes}
                  taskDueDate={taskDueDate}
                  taskPriority={taskPriority}
                  setTaskName={setTaskName}
                  setTaskDes={setTaskDes}
                  setTaskDueDate={setTaskDueDate}
                  setTaskPriority={setTaskPriority}
                />
                <br />
                <Button
                  onClick={() =>
                    updateTask({
                      ...selectedTask,
                      taskName,
                      taskDes,
                      taskDueDate,
                      taskPriority,
                    })
                  }
                  title="Update"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
