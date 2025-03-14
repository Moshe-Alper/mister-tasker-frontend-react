import { Link } from 'react-router-dom'

export function TaskPreview({ task }) {
    console.log('🚀 task', task)
    return <article className="preview">
        <header>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
        </header>

        <p>Importance: <span>{task.importance.toLocaleString()}</span></p>
        {task.owner && <p>Owner: <span>{task.owner.fullname}</span></p>}
        
    </article>
}