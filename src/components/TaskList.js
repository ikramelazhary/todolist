import React from "react";

function TaskList({ tasks, filter, search, deleteTask, editTask, changeState }) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.state === filter;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul className="task-list">
      {searchedTasks.map((task) => (
        <li key={task.id} className={`task-item ${task.state}`}>
          <span>{task.name}</span>
          <select
            value={task.state}
            onChange={(e) => changeState(task.id, e.target.value)}
            className="task-state-dropdown"
          >
            <option value="Planifié">Planifié</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
          <div className="task-actions">
            <button
              onClick={() => {
                const newName = prompt("Modifier la tâche", task.name);
                if (newName) editTask(task.id, newName);
              }}
              className="edit-btn"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-btn"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
