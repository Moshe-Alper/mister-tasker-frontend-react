import { userService } from '../services/user'
import { TaskPreview } from './TaskPreview'

export function TaskList({ tasks, onRemoveTask, onUpdateTask, onStartTask }) {
    
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
                    {task.status === 'running' ? (
                        <span className="status-running">Running...</span>
                    ) : task.status === 'failed' ? (
                        <button onClick={() => onStartTask(task)}>Retry</button>
                    ) : task.status === 'done' ? (
                        <span className="status-done">Completed</span>
                    ) : (
                        <button onClick={() => onStartTask(task)}>Start</button>
                    )}
                    <button onClick={() => onUpdateTask(task)}>Edit</button>
                    <button onClick={() => onRemoveTask(task._id)}>x</button>
                </div>}
            </li>)
        }
    </ul>
</section>
}