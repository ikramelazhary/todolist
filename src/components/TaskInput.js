import React from "react";

function TaskInput({ newTask, setNewTask, addTask }) {
  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Ajouter une nouvelle tâche..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="task-input-box"
      />
      <button onClick={addTask} className="add-task-btn">
        Ajouter
      </button>
    </div>
  );
}

export default TaskInput;
