import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadTask} from '../store/actions/task.actions'


export function TaskDetails() {

  const {taskId} = useParams()
  const task = useSelector(storeState => storeState.taskModule.task)

  useEffect(() => {
    loadTask(taskId)
  }, [taskId])



  return (
    <section className="task-details">
      <Link to="/task">Back to list</Link>
      <h1>Task Details</h1>
      {task && <div>
        <h3>{task.title}</h3>
        <pre> {JSON.stringify(task, null, 2)} </pre>
      </div>
      }
    </section>
  )
}