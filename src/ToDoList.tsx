import React, { useState, createContext } from 'react';
import FancyInput from './FancyInput';
import style from './ToDoList.module.css';

type Item = {
  name: string,
  description: string
};

type ToDoContext = {
  list: Item[],
  setList(newList: Item[]): void,
};

export const ToDoCtx = createContext<ToDoContext>({
  list: [], 
  setList: () => {throw new Error('setList not implemented')}
});

function ToDoList() {
  const [list, setList] = useState<Item[]>([]);

  return (
    <div className={style.container}>
      <ToDoCtx.Provider value={{list, setList}}>
        <FancyInput />
      </ToDoCtx.Provider>
      {
        list.map(item => {
          return (
            <div 
              key={`${item.name}`}
              className={style.item}>
              <div className={style.itemLeft} />
              <div className={style.itemRight}>
                {item.name}
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default ToDoList;