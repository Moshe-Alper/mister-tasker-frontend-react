import { Link } from 'react-router-dom'

export function TaskPreview({ task }) {
    return <article className="preview">
        <header>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
        </header>

        <p>Status: {task.status}</p>
        <p>Importance: {task.importance}</p>
        {task.triesCount > 0 && <p>Tries: {task.triesCount}</p>}
        {task.owner && <p>Owner: <span>{task.owner.fullname}</span></p>}

    </article>
}