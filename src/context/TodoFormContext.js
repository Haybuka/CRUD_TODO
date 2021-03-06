import React,{createContext,useState,useReducer} from 'react'


export const formContext = createContext()


export function TodoFormProvider({children}) {
    
    let [todos,setTodos] = useState([
      { isEdit:false,
      item:'Complete online javascript course',
      completed : true, 
      isActive : true,
      todoComplete : true,
      id : '12ee3'
    },{ isEdit:false,
      item:'Jog around the park 3x',
      completed : true, 
      isActive : true,
      todoComplete : true,
      id : '12ee3few'
    },{ isEdit:false,
      item:'10 minutes meditation',
      completed : false, 
      isActive : false,
      todoComplete : false,
      id : '12ee3f'
    },{ isEdit:false,
      item:'Complete todo app ',
      completed : true, 
      isActive : true,
      todoComplete : true,
      id : '12ee3fwe3'
    }])
    
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
