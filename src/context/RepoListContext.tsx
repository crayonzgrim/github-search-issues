import React, { createContext, useState, useEffect } from 'react';

interface InitContext {
  addRepo: (data: any) => void;
  removeRepo: (id: number) => void;
  lists: Record<string, any>[] | [];
}

type RepoListContextProviderProps = {
  children: React.ReactNode;
};

export const RepoContext = createContext<InitContext>({
  addRepo: () => {},
  removeRepo: () => {},
  lists: []
});

const getInitialState = () => {
  const lists = localStorage.getItem('lists');

  return lists ? JSON.parse(lists) : [];
};

export const RepoListContextProvider = (
  props: RepoListContextProviderProps
) => {
  const { children, ...others } = props;

  const [lists, setLists] = useState<Record<string, any>[] | []>(
    getInitialState()
  );

  const addRepo = (data: Record<string, any>) => {
    setLists((prev: any) => [...prev, { ...data[0] }]);
  };

  const removeRepo = (id: number) => {
    setLists((prev: any) => {
      return [...prev.filter((item: any) => item.id !== id)];
    });
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <RepoContext.Provider value={{ addRepo, removeRepo, lists }} {...others}>
      {props.children}
    </RepoContext.Provider>
  );
};
