import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadTasks, addTask, updateTask, removeTask, toggleTaskWorker, loadWorkerStatus, addTaskMsg } from '../store/actions/task.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { taskService } from '../services/task'
import { socketService, SOCKET_EVENT_TASK_UPDATED } from '../services/socket.service'

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

        socketService.on(SOCKET_EVENT_TASK_UPDATED, handleTaskUpdate)

        // Clean up on component unmount
        return () => {
            socketService.off(SOCKET_EVENT_TASK_UPDATED)
        }
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
        task.importance = +prompt('Importance?', 1) || 1
        try {
            const savedTask = await addTask(task)
            showSuccessMsg(`Task added (id: ${savedTask._id})`)
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    async function onStartTask(task) {
        try {
            const updatedTask = await taskService.startTask(task._id)
            _handleTaskMessage(updatedTask)
        } catch (err) {
            showErrorMsg(`Cannot start task: ${err.message || 'Server error'}`)
        }
    }

    function handleTaskUpdate(updatedTask) {
        updateTask(updatedTask)
        _handleTaskMessage(updatedTask)
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

    function _handleTaskMessage(task) {
        if (task.status === 'done') {
            showSuccessMsg(`Task "${task.title}" completed successfully`)
        } else if (task.status === 'failed') {
            showErrorMsg(`Task "${task.title}" execution failed: ${task.errors?.[task.errors.length - 1] || 'Unknown error'}`)
        } else {
            showSuccessMsg(`Task "${task.title}" status updated to "${task.status}"`)
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
                onStartTask={onStartTask}
            />
        </main>
    )
}