import React, { useState, createContext } from 'react';
import FancyInput from './FancyInput';
import style from './ToDoList.module.css';

interface Item {
  name: string;
  description: string;
};

interface ToDoContext {
  list: Item[];
  setList(newList: Item[]): void;
};

export const ToDoCtx = createContext<ToDoContext>({
  list: [],
  setList: () => {
    throw new Error('setList not implemented');
  }
});

function ToDoList() {
  const [list, setList] = useState<Item[]>([]);

  return (
    <div className={style.container}>
      <ToDoCtx.Provider value={{ list, setList }}>
        <FancyInput />
      </ToDoCtx.Provider>
      {list.map((item, idx) => {
        return (
          <div key={`${item.name}-${idx}`} className={style.item}>
            <div className={style.itemLeft} />
            <div className={style.itemRight}>
              <div className={style.name}> {item.name}</div>
              <div className={style.description}> {item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ToDoList;
