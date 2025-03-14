import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadTasks, addTask, updateTask, removeTask, addTaskMsg } from '../store/actions/task.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { taskService } from '../services/task'
import { userService } from '../services/user'

import { TaskList } from '../cmps/TaskList'
import { TaskFilter } from '../cmps/TaskFilter'

export function TaskIndex() {

    const [ filterBy, setFilterBy ] = useState(taskService.getDefaultFilter())
    const tasks = useSelector(storeState => storeState.taskModule.tasks)

    useEffect(() => {
        loadTasks(filterBy)
    }, [filterBy])

    async function onRemoveTask(taskId) {
        try {
            await removeTask(taskId)
            showSuccessMsg('Task removed')            
        } catch (err) {
            showErrorMsg('Cannot remove task')
        }
    }

    async function onAddTask() {
        const task = taskService.getEmptyTask()
        task.title = prompt('Title?')
        try {
            const savedTask = await addTask(task)
            showSuccessMsg(`Task added (id: ${savedTask._id})`)
        } catch (err) {
            showErrorMsg('Cannot add task')
        }        
    }

    async function onUpdateTask(task) {
        const importance = +prompt('New importance?', task.importance)
        if(importance === 0 || importance === task.importance) return

        const taskToSave = { ...task, importance }
        try {
            const savedTask = await updateTask(taskToSave)
            showSuccessMsg(`Task updated, new importance: ${savedTask.importance}`)
        } catch (err) {
            showErrorMsg('Cannot update task')
        }        
    }

    return (
        <main className="task-index">
            <header>
                <h2>Tasks</h2>
                {userService.getLoggedinUser() && <button onClick={onAddTask}>Add a Task</button>}
            </header>
            <TaskFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <TaskList 
                tasks={tasks}
                onRemoveTask={onRemoveTask} 
                onUpdateTask={onUpdateTask}/>
        </main>
    )
}