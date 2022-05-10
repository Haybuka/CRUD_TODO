import { useContext} from "react";
import { TodoFormProvider } from "./context/TodoFormContext";
import { TodoActions, TodoListItem,TodoForm,ActiveTodo,CompletedTodo } from "./component/todo/TodoFile";
import { Routes,Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import UseReduce from "./component/reducer/UseReduce";
import Header from "./component/todo/Header";

import './App.css'

function App() {
  const {mode} = useContext(ThemeContext)
  return (
    <div className={mode ? 'contains light':'contains dark'}>
      <TodoFormProvider>
          <div className='Todo'>

             <Header />
             <main>
             <TodoForm />

                <Routes>
                   <Route path="/" element={<TodoListItem />}/>
                   <Route path="active" element={<ActiveTodo />}/>
                   <Route path="completed" element={<CompletedTodo />}/>
   
                </Routes>
             </main>
             <TodoActions />
             
         </div>
      </TodoFormProvider>
      <p className="instruction">Drag and drop to reorder list</p>
      
    </div>
  );
  // return(
  //    <UseReduce />
  // )
}

export default App;

