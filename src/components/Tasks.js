
import Task from './Task'

//useState hook as the tasks are of a state
const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
    <>
    {tasks.map((task, index) => (
        <Task key = {index} task = {task} 
        onDelete = {onDelete}
        onToggle = {onToggle}/>

    ))}

    </>
  )
}

export default Tasks




// const tasks = [
//     {
//         id:1,
//         text: 'Workout',
//         day:'Monday',
//     },
//     {
//         id:2,
//         text: 'Cook',
//         day:'Tuesday',
//     },
// ]


// return (
//     <>
//     {tasks.map((task) => (
//         <h3 key= {task.id}>{task.text}</h3>
//     )}
//     </>
//   )

//map takes a function so task.map((each task) => {return the output})
