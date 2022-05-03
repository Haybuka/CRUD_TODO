import { useContext} from "react";
import Todo from "./component/todo/Todo";
import { TodoFormProvider } from "./context/TodoFormContext";
import { TodoActions, TodoListItem,TodoForm,ActiveTodo,CompletedTodo } from "./component/todo/TodoFile";
// import UseReduce from "./component/reducer/UseReduce";
import { Routes,Route } from "react-router-dom";
import Header from "./component/todo/Header";
import './App.css'
import { ThemeContext } from "./context/ThemeContext";
function App() {
  const {mode} = useContext(ThemeContext)
  return (
    <div className='contains '>
      <TodoFormProvider>
          <div className='w-3/4 md:w-3/5 lg:w-2/5 mx-auto py-3'>

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
    
      
    </div>
  );
}

export default App;
