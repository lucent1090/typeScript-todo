import React, { useState, createContext } from 'react';
import FancyInput from './FancyInput';

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
    <ol>
      {
        list.map(item => {
          return (
            <li key={`${item.name}`}>
              {item.name}
            </li>
          );
        })
      }
      <ToDoCtx.Provider value={{list, setList}}>
        <FancyInput />
      </ToDoCtx.Provider>
    </ol>
  );
};

export default ToDoList;