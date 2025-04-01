import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [randomlyChosen, setRandom] = useState("")
  const [err, setError] = useState(null);
  const [type, setType] = useState("");
  const navigator = useNavigate();
  const [boards, setBoards] = useState([])
  const [fautly, setFaulty] = useState(false)


  return (
    <MyContext.Provider value={{ err, setError, type, setType, navigator, boards, setBoards, randomlyChosen, setRandom, fautly, setFaulty }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
