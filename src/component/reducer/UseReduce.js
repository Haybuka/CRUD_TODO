import React from 'react'



function UseReduce() {

 const [input,setInput] = React.useState('');
 const formReducer = (state,action) =>{
   switch(action.type){
       case 'HANDLE INPUT TEXT' :
           return {
               ...state,
               [action.field] : action.payload,
           }
        case 'CHECK':
            return {
                ...state,
                check : !state.checker
            }
        default :
           return state;
   }
 }
 const initialFormState = {
    username: "",
    check : false
    // password: "",
    // hasConsented: false,
    };

    const [formState, dispatch] = React.useReducer(formReducer, initialFormState);

    const handleChange = (e) => {
        dispatch({
            type : 'CHECK',
            field : e.target.name,
            payload : e.target.value
        })
        console.log(e.target.value)
        console.log(e.target.name)
    }
    const handleCheck = (e) => {
        dispatch({
            type : 'HANDLE INPUT TEXT',
            field : e.target.name,
            payload : e.target.value
        })
    }
 const handleSubmit= (e) =>{
   e.preventDefault()
   console.log(formState)
 }

  return (
    <section>
         
          <div>
              <form onSubmit={(e) => handleSubmit(e)} className="px-4 w-3/5 mx-auto bg-red-500">
                    <label className='checker'>
                        <input name='check' type="checkbox" checked={initialFormState.check} onChange={e => handleCheck(e)}/>
                        <span>

                      </span>
                  </label>
                  <p className='py-3'>input here</p>
                  <input name="username" placeholder='input' 
                  className='my-2 pl-1 py-2 w-full' type="input" value={formState.username}
                   onChange={e => handleChange(e)}/>
              </form>
          </div>
    </section>
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