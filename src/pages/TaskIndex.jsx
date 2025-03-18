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


    function handleTaskUpdate(updatedTask) {
        updateTask(updatedTask)
        showSuccessMsg(`Task "${updatedTask.title}" updated (${updatedTask.status})`)
    }

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

    async function onUpdateTask(task, updates = {}) {
        // If no specific updates provided, use the existing importance prompt
        if (Object.keys(updates).length === 0) {
          const importance = +prompt('New importance?', task.importance)
          if (importance === 0 || importance === task.importance) return
          updates = { importance }
        }
        
        const taskToSave = { ...task, ...updates }
        try {
          const savedTask = await updateTask(taskToSave)
          
          // Customize message based on what was updated
          let message = 'Task updated'
          if (updates.importance) message += `, new importance: ${savedTask.importance}`
          if (updates.status) message += `, new status: ${savedTask.status}`
          
          showSuccessMsg(message)
        } catch (err) {
          showErrorMsg('Cannot update task')
        }
      }

      async function onStartTask(task) {
        try {
            const updatedTask = await taskService.startTask(task._id)
            
            if (updatedTask.status === 'done') {
                showSuccessMsg(`Task "${task.title}" completed successfully`)
            } else if (updatedTask.status === 'failed') {
                showErrorMsg(`Task "${task.title}" execution failed: ${updatedTask.errors[updatedTask.errors.length-1] || 'Unknown error'}`)
            } else {
                showErrorMsg(`Task "${task.title}" status is now ${updatedTask.status}`)
            }
        } catch (err) {
            // This is for API/network failures, not task execution failures
            showErrorMsg(`Cannot start task: ${err.message || 'Server error'}`)
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