import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import TodoList from './components/TodoList'
import CreateTodo from './components/CreateTodo'
import EditTodo from './components/EditTodo'
import ViewTodo from './components/ViewTodo'

function App() {
  return (
    <BrowserRouter>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 overflow-auto">
        <div className="p-4">
          <nav className="mb-8">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">Todo List </Link>
            <Link to="/create" className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Create New
            </Link>
          </nav>
          
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/create" element={<CreateTodo />} />
            <Route path="/view/:id" element={<ViewTodo />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
