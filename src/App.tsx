import React from 'react';
import style from './App.module.css';
import ToDoList from './ToDoList';
import Weather from './Weather';

function App() {
  return (
    <div className={style.container}>
      <Weather />
      <ToDoList />
    </div>
  );
}

export default App;
