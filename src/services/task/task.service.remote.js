import { httpService } from '../http.service'

export const taskService = {
    query,
    getById,
    save,
    remove,
    clear,
    startTask,
    toggleWorker,
    getWorkerStatus,
    addTaskMsg
}

async function query(filterBy = { txt: '' }) {
    return httpService.get(`task`, filterBy)
}

function getById(taskId) {
    return httpService.get(`task/${taskId}`)
}

async function remove(taskId) {
    return httpService.delete(`task/${taskId}`)
}

async function clear() { 
    return httpService.delete(`task/clear`) 
} 

async function save(task) {
    var savedTask
    if (task._id) {
        savedTask = await httpService.put(`task/${task._id}`, task)
    } else {
        savedTask = await httpService.post('task', task)
    }
    return savedTask
}

async function startTask(taskId) {
    return httpService.post(`task/${taskId}/start`)
}


async function toggleWorker() {
    return await httpService.post('task/worker/toggle')
}

async function getWorkerStatus() {
    return await httpService.get('task/worker/status')
}

async function addTaskMsg(taskId, txt) {
    const savedMsg = await httpService.post(`task/${taskId}/msg`, {txt})
    return savedMsg
}