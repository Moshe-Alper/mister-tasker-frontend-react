import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadTask, addTaskMsg } from '../store/actions/task.actions'


export function TaskDetails() {

  const {taskId} = useParams()
  const task = useSelector(storeState => storeState.taskModule.task)

  useEffect(() => {
    loadTask(taskId)
  }, [taskId])

  async function onAddTaskMsg(taskId) {
    try {
        await addTaskMsg(taskId, 'bla bla ' + parseInt(Math.random()*10))
        showSuccessMsg(`Task msg added`)
    } catch (err) {
        showErrorMsg('Cannot add task msg')
    }        

}

  return (
    <section className="task-details">
      <Link to="/task">Back to list</Link>
      <h1>Task Details</h1>
      {task && <div>
        <h3>{task.title}</h3>
        <pre> {JSON.stringify(task, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddTaskMsg(task._id) }}>Add task msg</button>

    </section>
  )
}