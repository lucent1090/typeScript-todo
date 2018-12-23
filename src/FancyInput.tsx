import React, { useState, useContext }from 'react';
import { ToDoCtx } from './ToDoList';

function FancyInput() {
  const {list, setList} = useContext(ToDoCtx);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    setList(list.concat([{name: inputValue, description: ''}]));
    setInputValue('');
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <>
      <input value={inputValue} onChange={handleInputChange}/>
      <button onClick={handleClick}>
        Add
      </button>
    </>
  );
};

export default FancyInput;