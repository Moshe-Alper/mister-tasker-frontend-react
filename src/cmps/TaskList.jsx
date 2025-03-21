import { userService } from '../services/user'
import { Link } from 'react-router-dom'

export function TaskList({ tasks, onRemoveTask, onStartTask }) {

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

                                <div className="actions">
                                    {!(task.status === 'running' || task.status === 'done') && (
                                        <button onClick={() => onStartTask(task)}>
                                            {task.status === 'failed' ? 'Retry' : 'Start'}
                                        </button>
                                    )}
                                    <button onClick={() => onRemoveTask(task._id)}>Delete</button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}