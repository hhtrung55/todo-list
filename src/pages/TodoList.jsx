import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Modal } from "../components";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import { options, minDate } from "../utils/constants";

import "./TodoList.css";

const getTasks = () => {
  return JSON.parse(localStorage.getItem("list") || "[]");
};

export default function TodoList(props) {
  const [tasks, setTasks] = useState(getTasks);
  const [filteredTasks, setFilteredTasks] = useState(getTasks);

  const [taskName, setTaskName] = useState("");
  const [taskDes, setTaskDes] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(minDate);
  const [taskPriority, setTaskPriority] = useState(options[0]);

  const onSubmit = () => {
    if (!taskName) return alert("The name of task is required");
    const task = {
      id: new Date(taskDueDate).getTime(),
      taskName,
      taskDes,
      taskDueDate,
      taskPriority,
      createdAt: Date.now(),
    };
    const newList = [task, ...tasks].sort((a, b) => a.id - b.id);
    setTasks(newList);
    resetTask();
  };

  const resetTask = useCallback(() => {
    setTaskName("");
    setTaskDes("");
    setTaskDueDate(minDate);
    setTaskPriority(options[0]);
  }, []);

  const removeTask = useCallback(
    (createdAtTask) => {
      const isSure = window.confirm("Are you sure?");
      if (!isSure) return;
      const newList = tasks.filter(
        ({ createdAt }) => createdAtTask !== createdAt
      );
      setTasks(newList);
      localStorage.setItem("list", JSON.stringify(newList));
    },
    [tasks]
  );

  const updateTask = (taskUpdated) => {
    const newList = tasks.map((task) => {
      if (task.createdAt === taskUpdated.createdAt) {
        return taskUpdated;
      }
      return task;
    });
    setTasks(newList);
    localStorage.setItem("list", JSON.stringify(newList));
    alert('success')
  };

  const onFilter = useCallback(
    (searchTerm) => {
      if (!searchTerm) return setFilteredTasks(tasks);
      const validTasks = tasks.filter(({ taskName }) =>
        taskName.toUpperCase().includes(searchTerm.toUpperCase())
      );
      setFilteredTasks(validTasks);
    },
    [tasks]
  );

  useEffect(() => {
    onFilter();
  }, [tasks.length]);

  return (
    <div id="layout">
      <section className="newTask">
        <h2>New Task</h2>
        <br />
        <TaskForm
          taskName={taskName}
          taskDes={taskDes}
          taskDueDate={taskDueDate}
          taskPriority={taskPriority}
          setTaskName={setTaskName}
          setTaskDes={setTaskDes}
          setTaskDueDate={setTaskDueDate}
          setTaskPriority={setTaskPriority}
        />
        <br />
        <br />
        <Button onClick={onSubmit} title="Add" />
      </section>
      <section className="todoList">
        <h2>Todo List</h2>
        <br />
        <Input
          placeholder="Search"
          onChange={(e) => onFilter(e.target.value)}
        />
        <br />
        <TaskList
          tasks={filteredTasks}
          onRemove={removeTask}
          updateTask={updateTask}
        />
      </section>
    </div>
  );
}