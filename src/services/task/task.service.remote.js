import { httpService } from '../http.service'

export const taskService = {
    query,
    getById,
    save,
    remove,
    addTaskMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`task`, filterBy)
}

function getById(taskId) {
    return httpService.get(`task/${taskId}`)
}

async function remove(taskId) {
    return httpService.delete(`task/${taskId}`)
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

async function addTaskMsg(taskId, txt) {
    const savedMsg = await httpService.post(`task/${taskId}/msg`, {txt})
    return savedMsg
}