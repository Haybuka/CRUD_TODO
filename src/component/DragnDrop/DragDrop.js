import React,{useState} from 'react'

import './drag.css'




function DragDrop() {
  const [enter,setEnter] = useState(false)
  let [dragId,setDragId] = useState(0)
  const [dragElements,setDragElements] = useState(
    [{name : 'item One',id:0, entered : false},
    {name : 'item Two',id:1, entered : false},
    {name : 'item Three',id:2, entered : false},
    {name : 'item Four',id:3, entered : false},
    {name : 'item Five',id:4, entered : false},
    {name : 'item Six',id:5, entered : false},
    ]
  )
  let dragStartIndex;


function dragOver(e){
  e.preventDefault()
  // console.log('drag over')
}

  function dragStart(idOne){
    dragStartIndex = idOne
  }
  function dropped(e,idTwo){
    // e.preventDefault()
    const dragEndIndex = idTwo
  
    swapItems(dragStartIndex,dragEndIndex)
  }
   
  function swapItems(fromIndex,toIndex){
  console.log('from',fromIndex,'to',toIndex)
    const itemOne = dragElements[fromIndex]
    const itemTwo = dragElements[toIndex]
    const dragA = dragElements.map((elements,index )=> index === toIndex ? {...itemOne}: elements)
    console.log(dragA)
    const dragB = dragA.map((ele,index)=> index === fromIndex ? {...itemTwo}:ele)
     setDragElements(dragB)
  }

  return (
    <section>
       <ul className='draggable-list' id='draggable-list'>
         {dragElements.map( (ele,idx) => (
           <li key={idx} id={idx} 
              onDragStart={()=> dragStart(idx)} 
              onDragOver={(e)=> dragOver(e)}
              onDrop={(e)=>dropped(e,idx)}
            
              draggable="true" className={enter ? 'draggable entered':'draggable'} >
                {ele.name}
              </li>
         ))}
         </ul>
    </section>
  )
}

export default DragDrop