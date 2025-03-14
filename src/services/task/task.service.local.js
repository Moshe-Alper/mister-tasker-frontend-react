
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'task'

export const taskService = {
    query,
    getById,
    save,
    remove,
    addTaskMsg
}
window.cs = taskService


async function query(filterBy = { txt: '', price: 0 }) {
    var tasks = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        tasks = tasks.filter(task => regex.test(task.vendor) || regex.test(task.description))
    }
    if (minSpeed) {
        tasks = tasks.filter(task => task.speed >= minSpeed)
    }
    if(sortField === 'vendor' || sortField === 'owner'){
        tasks.sort((task1, task2) => 
            task1[sortField].localeCompare(task2[sortField]) * +sortDir)
    }
    if(sortField === 'price' || sortField === 'speed'){
        tasks.sort((task1, task2) => 
            (task1[sortField] - task2[sortField]) * +sortDir)
    }
    
    tasks = tasks.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return tasks
}

function getById(taskId) {
    return storageService.get(STORAGE_KEY, taskId)
}

async function remove(taskId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, taskId)
}

async function save(task) {
    var savedTask
    if (task._id) {
        const taskToSave = {
            _id: task._id,
            price: task.price,
            speed: task.speed,
        }
        savedTask = await storageService.put(STORAGE_KEY, taskToSave)
    } else {
        const taskToSave = {
            vendor: task.vendor,
            price: task.price,
            speed: task.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedTask = await storageService.post(STORAGE_KEY, taskToSave)
    }
    return savedTask
}

async function addTaskMsg(taskId, txt) {
    // Later, this is all done by the backend
    const task = await getById(taskId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    task.msgs.push(msg)
    await storageService.put(STORAGE_KEY, task)

    return msg
}