import React, { createContext, useContext, useState } from "react";
import { BsFillMoonFill,BsFillSunFill } from "react-icons/bs";

const themeStyles = {
  dark:{
    background:'#01211E',
    text:'white',
    img: <BsFillMoonFill/>
  },
  light:{
    background:'white',
    text:'black',
    img: <BsFillSunFill/>
  }
}
const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark');
  const value = { theme: themeStyles[theme], toggleTheme, themeName: theme };
  return <ThemeContext.Provider value={value} {...props} />;
}

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };