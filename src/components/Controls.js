import React from "react";

function Controls({ filter, setFilter, search, setSearch }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-dropdown"
      >
        <option value="all">Toutes</option>
        <option value="Planifié">Planifiées</option>
        <option value="En cours">En cours</option>
        <option value="Terminé">Terminées</option>
      </select>
    </div>
  );
}

export default Controls;
