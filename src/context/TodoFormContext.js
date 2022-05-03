import React,{createContext,useState} from 'react'


export const formContext = createContext()

export function TodoFormProvider({children}) {
    
    let [todos,setTodos] = useState([])
    let [active,setActive] = useState([])
    let [complete,setComplete] = useState([])
    //  let [checker,setChecker] = useState(false)
    
    function handleSetTodo(todoInput,checker,id){
     
      setTodos([...todos, {item:todoInput, completed : checker, id}])
    
    }

    function handleCompleted(id){
      const updateComplete = todos.map( todo => todo.id === id ? {...todo, completed : !todo.completed} : todo)
     setTodos(updateComplete)
    }

    function activeTodo(todos){
      // if(todos.length>=1){
       const active = todos.filter(todo => todo.completed === false && todo)
        setActive(active)
      // }
    }

    function completedTodo(todos){
      const completed = todos.filter(todo => todo.completed === true && todo)
      setComplete(completed)
    }

    function clearCompleted(){
      const notCompleted = todos.filter(todo => todo.completed === false && todo)
      setTodos(notCompleted)
    }
  return (
    <formContext.Provider value={{active,complete,clearCompleted,activeTodo,completedTodo,handleSetTodo,todos,setTodos,handleCompleted}}>
      {children}
    </formContext.Provider>
  )
}
