import { userService } from '../services/user'
import { Link } from 'react-router-dom'

export function TaskList({ tasks, onRemoveTask, onUpdateTask, onStartTask }) {

    function getStatusColor(status) {
        switch (status) {
            case 'running': return '#ffc107';
            case 'done': return '#28a745';
            case 'failed': return '#dc3545';
            default: return '#17a2b8';
        }
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
                                <div className="description-section">
                                <h2>Description:</h2>
                                <p>{task.description}</p>
                                </div>
                        <div className="timestamps">
                        <span>
                          Created at: {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'} | 
                          Last tried at: {task.lastTriedAt ? new Date(task.lastTriedAt).toLocaleString() : 'N/A'} | 
                          Done at: {task.doneAt ? new Date(task.doneAt).toLocaleString() : 'N/A'}
                        </span>
                      </div>

                            </td>
                            <td>{task.importance}</td>
                            <td style={{color: getStatusColor(task.status) }} >{task.status}</td>
                            <td>{task.triesCount > 0 ? task.triesCount : '-'}</td>
                            <td>

                                <div className="actions">
                                    {!(task.status === 'running' || task.status === 'done') && (
                                        <button onClick={() => onStartTask(task)}>
                                            {task.status === 'failed' ? 'Retry' : 'Start'}
                                        </button>
                                    )}
                                    <button onClick={() => onRemoveTask(task._id)}>Delete</button>
                                    <button onClick={() => onUpdateTask(task._id)}>Update</button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}