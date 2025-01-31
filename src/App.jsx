import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem('todos')
    if(todoString){
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])

  const saveTols = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const handleEdit = (e,id) => {
    let edittodo = todos.filter(i=>{
      return i.id === id
    })
    setTodo(edittodo[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveTols(todos)
  } 

  const handleDelete = (e,id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if(confirmDelete){
      let newTodos = todos.filter(item=>{
        return item.id !== id
      })
      setTodos(newTodos)
      saveTols(todos)
    }
    
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTols(todos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTols(todos)
  }
  
  return (
    <>
      <Navbar/>
      <div className='container'>
        <h1 className='text-center mt-8 font-bold'>ToDo List</h1>
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="relative">
            <input type="text" onChange={handleChange} value={todo} className="px-5 py-3 border-gray-200 rounded-3xl shadow-sm pr-12 w-96 bg-gray-200" placeholder="Add your tasks" />
            <button onClick={handleAdd} disabled={todo.length<=3} className="absolute inset-y-0 right-0 flex items-center gap-2 px-5 py-3 text-white bg-green-600 shadow-md hover:bg-green-600 rounded-4xl text-2xl disabled:bg-red-200">+</button>
          </div>
        </div>
          <div className='todos'>
            <h1 className='text-center mt-8 font-bold'>Your ToDos</h1>
            {todos.length === 0 && <div className='text-center mt-5'>No Items to Display</div>}
            {todos.map(item => {
              return (
              <div className='todo flex items-center justify-center px-5 py-3' id={item.id}>
                <div className="text w-96 bg-gray-200 px-5 py-3">
                  <input type="checkbox" onChange={handleCheckBox} className="completed mr-1" name={item.id} checked={item.isCompleted}/>
                  <span className={item.isCompleted ? 'line-through': ''}>{item.todo}</span>
                </div>
                <button className=' bg-blue-500 px-5 py-3 text-white font-bold' onClick={(e) => {handleEdit(e,item.id)}}>Edit</button>
                <button className=' bg-red-600 px-5 py-3 ml-1 text-white font-bold' onClick={(e) => {handleDelete(e,item.id)}}>Delete</button>
              </div>
              )
            })}
          </div>
      </div>
      
    </>
  )
}

export default App
