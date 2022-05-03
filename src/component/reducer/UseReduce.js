import React from 'react'

const reducer = (state,action) =>{
    switch(action.type){
        case 'ADD' : 
           return addNumbers(state,action)
        case 'SUBTRACT' :
            return subNumbers(state,action)
        case 'RANDOM' :
            return addRandom(state,action)
        default : 
           return state
    }

}

const addNumbers =(state,action)=> state + action.payload
const subNumbers = (state,action) => state - action.payload
const addRandom = (state,action) => state + action.payload

function UseReduce() {
 const [amount,dispatch] = React.useReducer(reducer,500)
 const add = (amount) =>{
     dispatch({
         type:'ADD',
         payload:amount
     })
 }

 const subtract = (amount) =>{
     dispatch({
         type:'SUBTRACT',
         payload : amount
     })
 }

 const randomAdd = (amount) =>{
     dispatch({
         type:'RANDOM',
         payload : amount
     })
 }
  return (
    <section>
          <p className='text-center'>{amount}</p>
          <p className='text-center my-4'>
             <button onClick={()=> add(Math.floor(Math.random() * 8100))} className='px-4 bg-white mx-2 py-2'>ADD</button>
             <button onClick={()=> randomAdd(Math.floor(Math.random() * 800))} className='px-4 bg-white mx-2 py-2'>RANDOM</button>
             <button disabled={amount <= 0 && 'disabled'} onClick={()=> subtract(Math.floor(Math.random() * 8100))} className='px-4 bg-white mx-2 py-2'>SUBTRACT</button>
             
          </p>
    </section>
  )
}

export default UseReduce