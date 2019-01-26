import React, { useState, useContext } from 'react';
import { ToDoCtx } from './ToDoList';
import style from './FancyInput.module.css';

function FancyInput() {
  const { list, setList } = useContext(ToDoCtx);
  const [inputValue, setInputValue] = useState('');
  const [isError, setError] = useState(false);

  const handleClick = () => {
    if(!inputValue || (inputValue === '')) {
      setError(true);
      return;
    }

    const leftParentheses = inputValue.indexOf('(');
    const rightParentheses = inputValue.indexOf(')');
    if(leftParentheses === 0 && rightParentheses > 0) {
      setList(list.concat([{ name: '', description: inputValue.slice(leftParentheses+1, rightParentheses)}]));
    } else if(leftParentheses > 0 && rightParentheses > 0) {
      setList(list.concat([{ 
        name: inputValue.slice(0, leftParentheses), 
        description: inputValue.slice(leftParentheses+1, rightParentheses)
      }]));
    } else {
      setList(list.concat([{ name: inputValue, description: '' }]));
    }
    setInputValue('');
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setError(false);
    setInputValue(event.currentTarget.value);
  };

  return (
    <div className={style.container}>
      <input
        className={`${style.input} ${isError ? style.isInputError : ''}`}
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
