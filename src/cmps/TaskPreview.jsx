import { Link } from 'react-router-dom'

export function TaskPreview({ task }) {
    return <article className="preview">
        <header>
            <Link to={`/task/${task._id}`}>{task.vendor}</Link>
        </header>

        <p>Speed: <span>{task.speed.toLocaleString()} Km/h</span></p>
        {task.owner && <p>Owner: <span>{task.owner.fullname}</span></p>}
        
    </article>
}