import React from "react";
import { Input, Select } from "./index";
import { options, minDate } from "../utils/constants";
import "./TaskForm.css";

const TaskForm = ({
  taskName,
  taskDes,
  taskDueDate,
  taskPriority,
  setTaskName,
  setTaskDes,
  setTaskDueDate,
  setTaskPriority,
  placeholder = "Add new task ...",
}) => {
  return (
    <div>
      <Input
        placeholder={placeholder}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <div className="d-flex f-column">
        <label>Description</label>
        <textarea
          rows={10}
          onChange={(e) => setTaskDes(e.target.value)}
          value={taskDes}
        />
      </div>
      <div className="d-flex">
        <div className="flex-grow-1" style={{ paddingRight: 20 }}>
          <label className="d-block">Due Date</label>
          <input
            className="d-block select--info"
            min={minDate}
            type="date"
            defaultValue={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
          />
        </div>
        <div className="flex-grow-1">
          <label className="d-block">Priority</label>
          <Select
            className="d-block select--info"
            options={options}
            getOption={setTaskPriority}
            defaultSelected={taskPriority}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
