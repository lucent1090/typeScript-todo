import React, { useState } from 'react';
import style from './Counter.module.css';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () =>  {
    setCount(count + 1);
  };

  return (
    <div className={style.container}>
      <p>You clicked {count} times!</p>
      <button onClick={handleClick}>
        Click Here 
      </button>
    </div>
  );
};

export default Counter;