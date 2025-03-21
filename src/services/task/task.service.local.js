
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'


const STORAGE_KEY = 'task'

export const taskService = {
    query,
    getById,
    save,
    remove,
}
window.cs = taskService


async function query(filterBy = { txt: '' }) {
    var tasks = await storageService.query(STORAGE_KEY)
    const { txt, minImportance, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        tasks = tasks.filter(task => regex.test(task.title) || regex.test(task.description))
    }
    if (minImportance) {
        tasks = tasks.filter(task => task.importance >= minImportance)
    }
    if(sortField === 'title'){
        tasks.sort((task1, task2) => 
            task1[sortField].localeCompare(task2[sortField]) * +sortDir)
    }
    if( sortField === 'importance'){
        tasks.sort((task1, task2) => 
            (task1[sortField] - task2[sortField]) * +sortDir)
    }
    
    tasks = tasks.map(({ _id, title, importance }) => ({ _id, title, importance }))
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
            importance: task.importance,
        }
        savedTask = await storageService.put(STORAGE_KEY, taskToSave)
    } else {
        const taskToSave = {
            title: task.title,
            importance: task.importance,
        }
        savedTask = await storageService.post(STORAGE_KEY, taskToSave)
    }
    return savedTask
}

