import React, { useState, useContext } from 'react';
import { ToDoCtx } from './ToDoList';
import style from './FancyInput.module.css';

function FancyInput() {
  const { list, setList } = useContext(ToDoCtx);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    setList(list.concat([{ name: inputValue, description: '' }]));
    setInputValue('');
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className={style.addBtn} onClick={handleClick}>
        Add
      </button>
    </div>
  );
}

export default FancyInput;
