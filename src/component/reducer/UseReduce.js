import React from 'react'



function UseReduce() {

const todoReducer = (state,action) =>{
    switch (action.type) {
        case 'DELETE' : 
            return state.filter( todo => todo.id !== action.payload.id && todo)
        case 'EDIT' :
            return handleEdit(state,action);
        case 'ADD' :
            return [...state,action.payload];
        default :
            return console.log(state);
    }
}

const todos = [
    {
      "isEdit": false,
      "item": "Learn database",
      "completed": false,
      "isActive": false,
      "todoComplete": false,
      "id": "8a2e79e1-4448-4d03-a0fe-4486ba634c3f"
    },
    {
      "isEdit": false,
      "item": "Practice NodeJs",
      "completed": true,
      "isActive": true,
      "todoComplete": true,
      "id": "8954a873-ccec-401d-a7e0-edd825dee3ec"
    },
    {
      "isEdit": false,
      "item": "Watch react",
      "completed": true,
      "isActive": true,
      "todoComplete": true,
      "id": "fc998726-4179-46ce-86b0-46ac3f422950"
    },
    {
      "isEdit": false,
      "item": "Learn Javascript",
      "completed": true,
      "isActive": true,
      "todoComplete": true,
      "id": "5c745258-f6aa-44ee-8cd8-594b030439a7"
    }
  ]
const handleEdit = (state,action) =>{
    const value = action.payload.newValue
    console.log(action.payload.id)
    console.log(value)
    const edited = state.filter( todo => todo.id === action.payload.id ? {...todo,value : value} : todo)
    const editedz = state.map( todo => todo.id === action.payload.id && {...todo,})
    console.log(editedz)
    return edited

}
  const [todoObject, dispatch] = React.useReducer(todoReducer, todos);


  const deleteTodo = (items) =>{
      dispatch({
          type : 'DELETE',
          payload : items
      })
    console.log(items)
  }

  const addTodo = (inputValue) =>{
      dispatch({
          type : 'ADD',
          payload : inputValue
      })
 
  }
  const editTodo = (id) =>{
    dispatch({
        type : 'EDIT',
        payload : {
            id: id,
            newValue : 'bought fish'
        }
    })
   
}
let [todoInput,setTodoInput] = React.useState('')


 const handleSubmit = (e,value) =>{
     e.preventDefault()
     const submittedValue = {
        "isEdit": false,
        "item": value,
        "completed": false,
        "isActive": false,
        "todoComplete": false,
        "id": Math.floor(Math.random() * 100000)
      }
   addTodo(submittedValue)
 }
  return (
      <div className='w-4/6 mx-auto bg-black text-white px-4 py-2'>
          <p>In us reducer</p>
          <form onSubmit={ e => handleSubmit(e,todoInput)}>
          <label className='w-full ml-1 text-black'>
           <input placeholder='Create a new todo'
            type="text" value={todoInput} onChange={ e => setTodoInput(e.target.value)}/>
        </label>
          </form>
          <ul>
              {todoObject && todoObject.map(todo => (
                  <li key={todo.id}
                   className='py-2 px-1 flex justify-between items-center my-3 bg-white text-black'>
                      <div>
                         {todo.item}
                      </div>
                      <div>
                          <button onClick={()=> deleteTodo(todo)} className='bg-red-400 mx-3 px-3 py-1 rounded-lg text-white'>Delete</button>
                          <button onClick={()=> editTodo(todo.id)} className='bg-red-400 mx-3 px-3 py-1 rounded-lg text-white'>Edit</button>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default UseReduce

//  const [amount,dispatch] = React.useReducer(reducer,500)


// const reducer = (state,action) =>{
//     switch(action.type){
//         case 'ADD' : 
//            return addNumbers(state,action)
//         case 'SUBTRACT' :
//             return subNumbers(state,action)
//         case 'RANDOM' :
//             return addRandom(state,action)
//         default : 
//            return state
//     }

// }



 /*{ <p className='text-center'>{amount}</p>
          <p className='text-center my-4'>
             <button onClick={()=> add(Math.floor(Math.random() * 8100))} className='px-4 bg-white mx-2 py-2'>ADD</button>
             <button onClick={()=> randomAdd(Math.floor(Math.random() * 800))} className='px-4 bg-white mx-2 py-2'>RANDOM</button>
             <button disabled={amount <= 0 && 'disabled'} onClick={()=> subtract(Math.floor(Math.random() * 8100))} className='px-4 bg-white mx-2 py-2'>SUBTRACT</button>
             
          </p> }*/


// const addNumbers =(state,action)=> state + action.payload
// const subNumbers = (state,action) => state - action.payload
// const addRandom = (state,action) => state + action.payload


// const add = (amount) =>{
//     dispatch({
//         type:'ADD',
//         payload:amount
//     })
// }

// const subtract = (amount) =>{
//     dispatch({
//         type:'SUBTRACT',
//         payload : amount
//     })
// }

// const randomAdd = (amount) =>{
//     dispatch({
//         type:'RANDOM',
//         payload : amount
//     })
// }