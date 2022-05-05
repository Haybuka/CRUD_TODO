import React,{useState,useContext} from 'react'
import { formContext} from '../../context/TodoFormContext'
import {v4 as uuid} from 'uuid'
import './TodoForm.css'
import './TodoList.css'
import './TodoActions.css'
import './TodoComplete.css'
import './TodoActive.css'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
//Form to add to list item
export function TodoForm() {
 
  const {handleSetTodo} = useContext(formContext)
  const {mode} = useContext(ThemeContext)
  let [todoInput,setTodoInput] = useState('')
  let [checker,setChecker] = useState(false)
  const handleSubmit = (e,todoInput,checker) =>{
    e.preventDefault();
  
    handleSetTodo(todoInput,checker,uuid())
    setTodoInput('')
  } 
  return (
    <form className={mode ? 'flex rounded-md items-center bg-white py-3 px-4 mb-8':'flex rounded-md items-center bg-gray-800 py-3 px-4 mb-8'} onSubmit={(e) => handleSubmit(e,todoInput,checker)}>
         <label className='checker'>
           <input type="checkbox" checked={checker} onChange={e => setChecker(!checker)}/>
           <span>

           </span>
        </label>
        <label className='w-full ml-1'>
           <input placeholder='Create a new todo' className={mode ? 'bg-white w-full text-gray-600 py-1 px-1 outline-none':'bg-gray-800 w-full text-white py-1 px-1 outline-none'} type="text" value={todoInput} onChange={ e => setTodoInput(e.target.value)}/>
        </label>
       
    </form>
  )
}


//This section handles the navigation 
export function TodoActions(){
  const {todos,activeTodo,completedTodo,clearCompleted} = useContext(formContext)
  const {mode} = useContext(ThemeContext)
  const todosLeft = todos.filter(todo => todo.completed === false)
    return(
        <footer className='TodoActions'>
            <ul className={mode?'light-actions TodoActions-main':'dark-actions TodoActions-main'}>
               <li className='col-start-1 col-end-5  md:col-span-3 inactive'>  {todosLeft.length} items left</li>
               <li className='hidden md:flex items-center'>
                   <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                      <p >All</p>    
                   </NavLink>
                   <NavLink to="active" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                     <p onClick={()=>activeTodo(todos)} className='cursor-pointer mx-4 md:mx-6 inline-block'>Active</p>
                   </NavLink>
                   <NavLink to="completed" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                     <p onClick={()=>completedTodo(todos)}>Completed</p>
                   </NavLink>
                </li>
                <li onClick={clearCompleted} className='col-end-13 col-span-5  text-right md:col-span-3 inactive cursor-pointer'>Clear Completed</li>
           </ul>
         <nav className={mode?'light-actions TodoActions-sub':'dark-actions TodoActions-sub'}>
                   <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                      <p >All</p>    
                   </NavLink>
                   <NavLink to="active" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white ')}>
                     <p onClick={()=>activeTodo(todos)} className='cursor-pointer mx-6 md:mx-6 inline-block'>Active</p>
                   </NavLink>
                   <NavLink to="completed" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                     <p onClick={()=>completedTodo(todos)}>Completed</p>
                   </NavLink>
              </nav>
          
        </footer>
    )
}


export function TodoListItem() {
  const {todos,setTodos,handleCompleted} = useContext(formContext)
  const {mode} = useContext(ThemeContext)
  const removeTodo= (id) =>{
    const updatedTodo = todos.filter( todo => todo.id !== id)
    setTodos(updatedTodo)
  }

  let dragStartIndex;

  const dragStart =(startIndex) =>{
    dragStartIndex = startIndex
  }
  const dragOver = (e,idx) =>{
    e.preventDefault()
  }
  const dropped = (e,endIndex) =>{
    const dragEndIndex = endIndex
    swapItems(dragStartIndex,dragEndIndex)
  }
  const swapItems = (fromIndex,toIndex) => {
    const itemOne = todos[fromIndex]
    const itemTwo = todos[toIndex]
    const dragA = todos.map((dragItem,index )=> index === toIndex ? {...itemOne}: dragItem)
    const dragB = dragA.map((dragItem,index)=> index === fromIndex ? {...itemTwo}:dragItem)
    setTodos(dragB)
  }
  return (
    <section className={mode ? 'TodoList bg-white text-gray-600 mt-3 ':'TodoList bg-gray-800 mt-3 text-white'}>
        <ul >
            {todos.map((todo,index) => (
                <li 
                 draggable="true"
                  onDragStart={()=> dragStart(index)}
                  onDragOver={(e)=> dragOver(e,index)}
                  onDrop={(e)=> dropped(e,index)}
                  key={todo.id} className="py-4 capitalize cursor-pointer"  
                  >
                   <div className='  flex justify-between items-center px-4'>
                     <section className='flex items-center' onClick={()=> handleCompleted(todo.id)}>
                        <p className={todo.completed ? 'checking checked-complete':'checking checked-incomplete'} 
                          >{todo.completed}</p>
                        <h4 className='capitalize'> {todo.item} </h4>
                     </section>
                     <p className='block md:hidden cursor-pointer delete-icon'  onClick={ e => removeTodo(todo.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                     </p>
                   </div>
                </li>
            ))}
        </ul>
    </section>
  )
}

// Handle Active cases


export function ActiveTodo() {
  const {active,setActive,handleCompleted,removeTodo} = useContext(formContext)
  const {mode} = useContext(ThemeContext)
  
  // drag and drop starts here
  let dragStartIndex;

  const dragStart =(startIndex) =>{
    dragStartIndex = startIndex
  }
  const dragOver = (e,idx) =>{
    e.preventDefault()
  }
  const dropped = (e,endIndex) =>{
    const dragEndIndex = endIndex
    swapItems(dragStartIndex,dragEndIndex)
  }
  const swapItems = (fromIndex,toIndex) => {
    const itemOne = active[fromIndex]
    const itemTwo = active[toIndex]
    const dragA = active.map((dragItem,index )=> index === toIndex ? {...itemOne}: dragItem)
    const dragB = dragA.map((dragItem,index)=> index === fromIndex ? {...itemTwo}:dragItem)
    setActive(dragB)
  }

  // drage and drop ends here

  return (
    <section className={mode ? 'TodoActive light-active':'TodoActive  dark-active'}>
    <ul >
        {active.length >= 1 ? (
          active.map((todo,index) => (
            <li key={todo.id}
            draggable="true"
            onDragStart={()=> dragStart(index)}
            onDragOver={(e)=> dragOver(e,index)}
            onDrop={(e)=> dropped(e,index)}
             className="py-4 capitalize cursor-pointer">
               <div className='  flex justify-between items-center px-4'>
                 <section className='flex items-center'>
                    <p className={todo.completed ? 'checking checked-complete':'checking checked-incomplete'} 
                      onClick={()=> handleCompleted(todo.id)}>{todo.completed}</p>
                    <h4 className=''> {todo.item} </h4>
                 </section>
                 <p className='cursor-pointer'  onClick={ e => removeTodo(todo.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                 </p>
               </div>
            </li>
        ))
        ): (
          <li className="p-4"> All items completed</li>
        )}
    </ul>
</section>
  )
}


// Handle Completed cases


export function CompletedTodo() {
  const {complete,handleCompleted,setComplete} = useContext(formContext)
  const {mode} = useContext(ThemeContext)
  
    // drag and drop starts here
    let dragStartIndex;

    const dragStart =(startIndex) =>{
      dragStartIndex = startIndex
    }
    const dragOver = (e,idx) =>{
      e.preventDefault()
    }
    const dropped = (e,endIndex) =>{
      const dragEndIndex = endIndex
      swapItems(dragStartIndex,dragEndIndex)
    }
    const swapItems = (fromIndex,toIndex) => {
      const itemOne = complete[fromIndex]
      const itemTwo = complete[toIndex]
      const dragA = complete.map((dragItem,index )=> index === toIndex ? {...itemOne}: dragItem)
      const dragB = dragA.map((dragItem,index)=> index === fromIndex ? {...itemTwo}:dragItem)
      setComplete(dragB)
    }
  
    // drage and drop ends here
  return (
    <section className={mode ? 'TodoComplete light-complete':'TodoComplete dark-complete'}>
    <ul >
        {complete.length >=1 ? (
          complete.map((todo,index) => (
            <li key={todo.id} 
            draggable="true"
            onDragStart={()=> dragStart(index)}
            onDragOver={(e)=> dragOver(e,index)}
            onDrop={(e)=> dropped(e,index)}
               className="py-4 capitalize cursor-pointer">
               <div className='  flex justify-between items-center px-4'>
                 <section className='flex items-center'>
                    <p className={todo.completed ? 'checking checked-complete':'checking checked-incomplete'} 
                      onClick={()=> handleCompleted(todo.id)}>{todo.completed}</p>
                    <h3 className='ml-4'> {todo.item} </h3>
                 </section>
                 {/* <p className='cursor-pointer'  onClick={ e => removeTodo(todo.id)}> */}
                 <p className='cursor-pointer'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                 </p>
               </div>
            </li>
        ))
        ) : (
          <li className="p-4"> No items completed</li>
        )}
    </ul>
</section>
  )
}


