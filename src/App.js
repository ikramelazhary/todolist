import React, { useState } from "react";
import "./App.css";
import logo from './PlanifyTodo.png'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null); // Task being edited
  const [editValue, setEditValue] = useState(""); // Value of the task being edited

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), name: newTask, state: "Planifié" }]);
      setNewTask("");
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditValue(task.name);
  };

  // Save the edited task
  const saveEdit = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, name: editValue } : task)));
    cancelEdit();
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask(null);
    setEditValue("");
  };

  // Change task state
  const changeState = (id, newState) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, state: newState } : task)));
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.state === filter;
  });

  // Search tasks
  const searchedTasks = filteredTasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
    <img src={logo} alt="Planify Logo" class="logo" />
    
    <div className="app">
     
      <header className="header">
        <h1>PlanifyToDo</h1>
      </header>
      

      <div className="controls">
       <input
      type="text"
      placeholder="Rechercher une tâche..."
       value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar" />
   
       <div className="filter-buttons">
        <button
      className={`filter-btn ${filter === "all" ? "active" : ""}`}
      onClick={() => setFilter("all")}
      >
      Toutes
       </button>
        <button
        className={`filter-btn ${filter === "Planifié" ? "active" : ""}`}
          onClick={() => setFilter("Planifié")}
        >
         Planifiées
        </button>
        <button
        className={`filter-btn ${filter === "En cours" ? "active" : ""}`}
      onClick={() => setFilter("En cours")}
        >
      En cours
    </button>
    <button
      className={`filter-btn ${filter === "Terminé" ? "active" : ""}`}
      onClick={() => setFilter("Terminé")}
    >
      Terminées
    </button>
    </div>
    </div>


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

      <ul className="task-list">
  {searchedTasks.map((task) => (
    <li key={task.id} className={`task-item ${task.state}`}>
      {editingTask === task.id ? (
        // Mode édition : Afficher le champ de texte
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="edit-input"
        />
      ) : (
        // Affichage normal : Nom de la tâche
        <span>{task.name}</span>
      )}

      {/* Masquer la liste déroulante en mode édition */}
      {editingTask !== task.id && (
        <select
          value={task.state}
          onChange={(e) => changeState(task.id, e.target.value)}
          className="task-state-dropdown"
        >
          <option value="Planifié">Planifié</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
      )}

      <div className="task-actions">
        {editingTask === task.id ? (
          // Boutons Enregistrer et Annuler
          <>
            <button onClick={() => saveEdit(task.id)} className="save-btn">
            ✅
            </button>
            <button onClick={cancelEdit} className="cancel-btn">
            ❌
            </button>
          </>
        ) : (
          // Boutons Modifier et Supprimer
          <>
            <button onClick={() => startEditing(task)} className="edit-btn">
              ✏️
            </button>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  ))}
  </ul>
  </div>
</div>

  );
}

export default App;
