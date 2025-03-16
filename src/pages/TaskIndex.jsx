import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadTasks, addTask, updateTask, removeTask, toggleTaskWorker, loadWorkerStatus, addTaskMsg } from '../store/actions/task.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { taskService } from '../services/task'

import { TaskList } from '../cmps/TaskList'
import { TaskFilter } from '../cmps/TaskFilter'

export function TaskIndex() {

    const [filterBy, setFilterBy] = useState(taskService.getDefaultFilter())
    const tasks = useSelector(storeState => storeState.taskModule.tasks)
    const [isWorkerRunning, setIsWorkerRunning] = useState(false)

    useEffect(() => {
        loadTasks(filterBy)
    }, [filterBy])

    useEffect(() => {
        const fetchWorkerStatus = async () => {
            try {
                const status = await loadWorkerStatus()
                setIsWorkerRunning(status.isWorkerOn)
            } catch (err) {
                console.error('Failed to load worker status', err)
            }
        }
        fetchWorkerStatus()
    }, [])

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
        if (importance === 0 || importance === task.importance) return

        const taskToSave = { ...task, importance }
        try {
            const savedTask = await updateTask(taskToSave)
            showSuccessMsg(`Task updated, new importance: ${savedTask.importance}`)
        } catch (err) {
            showErrorMsg('Cannot update task')
        }
    }

    async function onStartTask(task) {
        try {
            const updatedTask = await taskService.startTask(task._id)
            showSuccessMsg(`Task "${task.title}" is now running`)
        } catch (err) {
            showErrorMsg('Cannot start task')
        }
    }

    async function onToggleWorker() {
        try {
            const response = await toggleTaskWorker()
            setIsWorkerRunning(response.isWorkerOn)
            showSuccessMsg(response.msg)
        } catch (err) {
            showErrorMsg('Cannot toggle task worker')
        }
    }


    return (
        <main className="task-index">
            <header>
                <button onClick={onAddTask}>Create new task</button>
                <button onClick={onToggleWorker}>
                    {isWorkerRunning ? 'Stop Task Worker' : 'Start Task Worker'}
                </button>
            </header>
            <TaskFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <TaskList
                tasks={tasks}
                onRemoveTask={onRemoveTask}
                onUpdateTask={onUpdateTask}
                onStartTask={onStartTask}
            />
        </main>
    )
}