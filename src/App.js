import Header from "./components/Header";
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

//useEffect is used if you want something to happen when the page loads

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false) 
  const [tasks, setTasks ] = useState([])

    //using fetch API
    //fetch returns a promise so we want to await the promise
    useEffect(() => {
      const getTasks = async () => {

        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
    }
      getTasks()
    }, [])  //dependency array - when you give a value in the useEffect() to run, you wanna pass a value in the [] if it changes.
    //we dont have any so []



//fetch tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  
  console.log(data)
  return data
}

//fetch task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  
  console.log(data)
  return data
}


//AddTask
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers:{
      'Content-type':'application/json'
      },
    body: JSON.stringify(task)

    })

    const data = await res.json()

    setTasks([...tasks, data])



  // const id = Math.floor(Math.random() *10000) + 1
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
}

//Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  setTasks(tasks.filter((task) => task.id !== id))
}
//filter takes in a function
//mutable state so using setTask s


//To delete :
// we declare deleteTask func in Apps.js
// we pass a prop to tasks.js because
// task where the button is, and task is in tasks.js 
// onDelete is a prop of tasks and also task however we want to call that onclick
// so state gets passed down, actions get passed up
//app.js has the state


//Toggle Reminder
const toggleReminder = async (id) => {

  const tasktoToggle = await fetchTask(id)
  const updatedTask = {...tasktoToggle, reminder: !tasktoToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()


  setTasks(
    tasks.map((task) => task.id === id ? {...task, 
    reminder: data.reminder} : task )
  )
}  


//<Routes> outside <Route> 

return (
  <Router>
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <Routes>
        <Route path='/' element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
        />
        <Route path='/about' element={<About />} />

        <Route path='/task/:id' element={<TaskDetails/>} />
      </Routes>
      <Footer />
    </div>
  </Router>
)
}

// if no tasks we handle that here



export default App;




// Class Implementation
// import React from 'react'
// class App extends React.Component{
//   render(){
//     return <h1> Hello from a class</h1>
//   }
// }
