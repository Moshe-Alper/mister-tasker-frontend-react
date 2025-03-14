import { userService } from '../services/user'
import { TaskPreview } from './TaskPreview'

export function TaskList({ tasks, onRemoveTask, onUpdateTask }) {
    
    function shouldShowActionBtns(task) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return task.owner?._id === user._id
    }

    return <section>
        <ul className="list">
            {tasks.map(task =>
                <li key={task._id}>
                    <TaskPreview task={task}/>
                    {shouldShowActionBtns(task) && <div className="actions">
                        <button onClick={() => onUpdateTask(task)}>Edit</button>
                        <button onClick={() => onRemoveTask(task._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}