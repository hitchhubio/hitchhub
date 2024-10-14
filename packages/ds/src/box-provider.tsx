import { createContext, useContext, ReactNode } from 'react';
import { Box } from './box.js';

const BoxContext = createContext(Box);

export const useBox = () => {
  return useContext(BoxContext);
};

export const BoxProvider = ({
  children,
  box,
}: {
  children: ReactNode;
  box?: any;
}) => {
  return (
    <BoxContext.Provider value={box ?? Box}>{children}</BoxContext.Provider>
  );
};
