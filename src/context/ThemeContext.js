import React,{useState,createContext} from 'react'

export const ThemeContext = createContext ()

export function ThemeProvider({children}) {
const [mode,setMode] = useState(false)
const handleMode = () =>{
    setMode(!mode)
}
  return (
   <ThemeContext.Provider value={{mode,handleMode}}>
    {children}
  </ThemeContext.Provider>
  )
}

