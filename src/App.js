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
      <p className="font-sm text-gray-700 opacity-60 text-center mt-4">Drag and drop to reorder list</p>
      
    </div>
  );
}

export default App;
