import { userService } from '../services/user'
import { Link } from 'react-router-dom'

export function TaskList({ tasks, onRemoveTask, onUpdateTask, onStartTask }) {

    function shouldShowActionBtns(task) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return task.owner?._id === user._id
    }

    return (
        <section>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Importance</th>
                        <th>Status</th>
                        <th>Tries</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>
                                <Link to={`/task/${task._id}`}>{task.title}</Link>
                            </td>
                            <td>{task.importance}</td>
                            <td>{task.status}</td>
                            <td>{task.triesCount > 0 ? task.triesCount : '-'}</td>
                            <td>
                                {shouldShowActionBtns(task) && (
                                    <div className="actions">
                                        {!(task.status === 'running' || task.status === 'done') && (
                                            <button onClick={() => onStartTask(task)}>
                                                {task.status === 'failed' ? 'Retry' : 'Start'}
                                            </button>
                                        )}
                                        <button onClick={() => onUpdateTask(task)}>Edit</button>
                                        <button onClick={() => onRemoveTask(task._id)}>Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}