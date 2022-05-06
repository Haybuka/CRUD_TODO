import React,{createContext,useState} from 'react'


export const formContext = createContext()

export function TodoFormProvider({children}) {
    
    let [todos,setTodos] = useState([])
    
    //CREATE : Data from todo is CREATED here and padded.
    function handleSetTodo(todoInput,checker,id){
     
      setTodos( [
        { isEdit:false,
          item:todoInput,
          completed : checker, 
          isActive : checker,
          todoComplete : checker,
          id
        },
        ...todos ])
    
    }

    


    //READ : Reads active and completed todos before they are set on route.
    let active = todos.filter(todo => todo.completed === false && todo)
    let complete = todos.filter(todo => todo.completed === true && todo)


    //UPDATE : Updates checked item and renders accordingly
     function handleCompleted(id){
       const updateComplete = todos.map( todo => todo.id === id ? {...todo, completed : !todo.completed} : todo)
       console.log('completed handled')
      setTodos(updateComplete)
     }

     
    //DELETE : Handles data deletion from list.
    
    const removeTodo= (id) =>{
      const updatedTodo = todos.filter( todo => todo.id !== id)
      setTodos(updatedTodo)
    }
  
   //DELETE :  Deletes completed items/

    function clearCompleted(){
      const notCompleted = todos.filter(todo => todo.completed === false && todo)
      setTodos(notCompleted)
    }

    // FEATURE : Handles order/sort based on drag and drop.
    const handleDrag = (dragElement) =>{
      setTodos(dragElement)
    }
  return (
    <formContext.Provider value={{active,complete,clearCompleted,removeTodo,handleSetTodo,todos,setTodos,handleCompleted,handleDrag}}>
       {children}
    </formContext.Provider>
  )
}
