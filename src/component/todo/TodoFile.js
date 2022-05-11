import React,{useState,useContext} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { formContext} from '../../context/TodoFormContext'
import {v4 as uuid} from 'uuid'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import { motion } from 'framer-motion'
import './TodoForm.css'
import './TodoList.css'
import './TodoActions.css'
import './TodoComplete.css'
import './TodoActive.css'

const listVariant = {
  hidden : {
    y:'-20px',
    opacity: 0
  },
  visible :{
    y : 0, 
    opacity : 1,
    transition : {

    }
  }
}
// Form to add tasks to the app
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
    <form className={mode ? 'form bg-white ':'form bg-primary-550'} onSubmit={(e) => handleSubmit(e,todoInput,checker)}>
         <label className='checker'>
           <input type="checkbox" checked={checker} onChange={e => setChecker(!checker)}/>
           <span>

           </span>
        </label>
        <label className='w-full ml-1'>
           <input placeholder='Create a new todo' 
           onFocus={ e => e.target.placeholder = 'Currently typing'}
           onBlur={ e => e.target.placeholder = 'Create a new todo'}
           className={mode ? 'bg-white text-gray-600 form-input ':'bg-primary-550 text-primary-0 form-input'} 
           type="text" value={todoInput} onChange={ e => setTodoInput(e.target.value)}/>
        </label>
       
    </form>
    )
}


// This section handles the navigation 

export function TodoActions(){
  const {todos,activeTodo,completedTodo,clearCompleted} = useContext(formContext)
  const {mode} = useContext(ThemeContext)

    //to handle items length based on route switch
  let navigation = useLocation().pathname
  let todosLeft ;

  if(navigation.includes('active')){
    todosLeft = todos.filter(todo => todo.completed === false)
  }else if (navigation.includes('completed')){
    todosLeft = todos.filter(todo => todo.completed === true)
  } else {
    todosLeft = todos
  }
  
  
    return(
        <footer className='TodoActions'>
            <ul className={mode?'light-actions TodoActions-main':'dark-actions TodoActions-main'}>
               <li className='col-start-1 col-end-5  md:col-span-3 font-light text-primary-50 hover:text-primary-0'>  {todosLeft.length} items left</li>
               <li className='hidden md:flex items-center'>
                   <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                      <p >All</p>    
                   </NavLink>
                   <NavLink to="active" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                     <p className='cursor-pointer mx-4 md:mx-6 inline-block'>Active</p>
                   </NavLink>
                   <NavLink to="completed" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                     <p >Completed</p>
                   </NavLink>
                </li>
                <li onClick={clearCompleted} className='clear-completed font-light text-primary-50 hover:text-primary-0'>Clear Completed</li>
           </ul>
         <nav className={mode?'light-actions TodoActions-sub':'dark-actions TodoActions-sub'}>
                   <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                      <p >All</p>    
                   </NavLink>
                   <NavLink to="active" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white ')}>
                     <p className='cursor-pointer mx-6 md:mx-6 inline-block'>Active</p>
                   </NavLink>
                   <NavLink to="completed" className={({ isActive }) => (isActive ? 'active' : 'inactive hover:text-white')}>
                     <p>Completed</p>
                   </NavLink>
              </nav>
          
        </footer>
    )
}

// All task render begins here

export function TodoListItem() {
  const {todos,setTodos,handleCompleted,removeTodo} = useContext(formContext)
  const {mode} = useContext(ThemeContext)

  //Drag and drop starts here
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

  //Drag and drop ends here

  return (
    <section className={mode ? 'TodoList light':'TodoList dark'}>
        <ul >
           {todos.length > 0 ? (
              todos.map((todo,index) => (
                <motion.li 
                  variants={listVariant}
                  initial="hidden"
                  animate="visible"
                  draggable="true"
                  onDragStart={()=> dragStart(index)}
                  onDragOver={(e)=> dragOver(e,index)}
                  onDrop={(e)=> dropped(e,index)}
                  key={todo.id} className=""  
                  >
                   <div className='justify-between flex-center px-4'>
                     <section className='flex-center' onClick={()=> handleCompleted(todo.id)}>
                        <p className={todo.completed ? 'checking checked-complete':'checking checked-incomplete'} 
                          >{todo.completed}</p>
                        <h4 className='capitalize'> {todo.item} </h4>
                     </section>
                     <p className='delete-icon'  onClick={ e => removeTodo(todo.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                     </p>
                   </div>
                </motion.li>
            ))
           ): (
             <li className='py-3 px-4'>No tasks added</li>
           )}
        </ul>
    </section>
  )
}

// Active tasks section

export function ActiveTodo() {
  const {active,handleCompleted,removeTodo} = useContext(formContext)
  const {mode} = useContext(ThemeContext)
  
  return (
    <section className={mode ? 'TodoActive light-active':'TodoActive  bg-primary-550 text-primary-350'}>
    <ul >
        {active.length >= 1 ? (
          active.map((todo,index) => (
            <motion.li key={todo.id}
            variants={listVariant}
            initial="hidden"
            animate="visible"
             className="py-4 capitalize cursor-pointer">
               <div className='  flex justify-between items-center px-4'>
                 <section className='flex items-center' onClick={()=> handleCompleted(todo.id)}>
                    <p className={todo.completed ? 'checking checked-complete':
                    'checking checked-incomplete'} >{todo.completed}</p>
                    <h4 className=''> {todo.item} </h4>
                 </section>
                 <p className='md:hidden delete-icon cursor-pointer'  onClick={ e => removeTodo(todo.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                 </p>
               </div>
            </motion.li>
        ))
        ): (
          <li className="p-4"> No active tasks</li>
        )}
    </ul>
</section>
  )
}


// Completed tasks section

export function CompletedTodo() {
  const {complete,handleCompleted,removeTodo} = useContext(formContext)
  const {mode} = useContext(ThemeContext)

  return (
    <section className={mode ? 'TodoComplete light-complete':'TodoComplete dark-complete'}>
    <ul >
        {complete.length >=1 ? (
          complete.map((todo,index) => (
            <motion.li key={todo.id} 
            variants={listVariant}
            initial="hidden"
            animate="visible"
               className="py-4 capitalize cursor-pointer">
               <div className='  flex justify-between items-center px-4'>
                 <section className='flex items-center'>
                    <p className={todo.completed ? 'checking checked-complete':'checking checked-incomplete'} 
                      onClick={()=> handleCompleted(todo.id)}>{todo.completed}</p>
                    <h3 className='ml-4'> {todo.item} </h3>
                 </section>
                 <p className='md:hidden delete-icon cursor-pointer' onClick={ e => removeTodo(todo.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                 </p>
               </div>
            </motion.li>
        ))
        ) : (
          <li className="p-4"> No tasks completed</li>
        )}
    </ul>
</section>
  )
}