import { useContext} from "react";
import { TodoFormProvider } from "./context/TodoFormContext";
import { TodoActions, TodoListItem,TodoForm,ActiveTodo,CompletedTodo } from "./component/todo/TodoFile";
import { Routes,Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import UseReduce from "./component/reducer/UseReduce";
import Header from "./component/todo/Header";
import { useLocation } from "react-router-dom";
import './App.css'
import { AnimatePresence } from "framer-motion";

function App() {
  const {mode} = useContext(ThemeContext)
  const location = useLocation()
  return (
    <div className={mode ? 'contains light':'contains dark'}>
      <TodoFormProvider>
          <div className='Todo'>

             <Header />
             <main>
               
             <TodoForm />

             <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                   <Route path="/" element={<TodoListItem />}/>
                   <Route path="active" element={<ActiveTodo />}/>
                   <Route path="completed" element={<CompletedTodo />}/>
   
                </Routes>
             </AnimatePresence>
                
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

