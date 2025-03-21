export const SET_TASKS = 'SET_TASKS'
export const SET_TASK = 'SET_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const ADD_TASK_MSG = 'ADD_TASK_MSG'
export const CLEAR_TASKS = 'CLEAR_TASKS'

const initialState = {
    tasks: [],
    task: null
}

export function taskReducer(state = initialState, action) {
    var newState = state
    var tasks
    switch (action.type) {
        case SET_TASKS:
            newState = { ...state, tasks: action.tasks }
            break
        case SET_TASK:
            newState = { ...state, task: action.task }
            break
        case REMOVE_TASK:
            const lastRemovedTask = state.tasks.find(task => task._id === action.taskId)
            tasks = state.tasks.filter(task => task._id !== action.taskId)
            newState = { ...state, tasks, lastRemovedTask }
            break
        case ADD_TASK:
            newState = { ...state, tasks: [...state.tasks, action.task] }
            break
        case UPDATE_TASK:
            tasks = state.tasks.map(task => (task._id === action.task._id) ? action.task : task)
            newState = { ...state, tasks }
            break
        case CLEAR_TASKS:
            newState = { ...state, tasks: [], lastRemovedTask: null }
            break
        case ADD_TASK_MSG:
            newState = { ...state, task: { ...state.task, msgs: [...state.task.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const task1 = { _id: 'b101', title: 'Task ' + parseInt(Math.random() * 10), msgs: [] }
    const task2 = { _id: 'b102', title: 'Task ' + parseInt(Math.random() * 10), msgs: [] }

    state = taskReducer(state, { type: SET_TASKS, tasks: [task1] })
    console.log('After SET_TASKS:', state)

    state = taskReducer(state, { type: ADD_TASK, task: task2 })
    console.log('After ADD_TASK:', state)

    state = taskReducer(state, { type: UPDATE_TASK, task: { ...task2, title: 'Good' } })
    console.log('After UPDATE_TASK:', state)

    state = taskReducer(state, { type: REMOVE_TASK, taskId: task2._id })
    console.log('After REMOVE_TASK:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = taskReducer(state, { type: ADD_TASK_MSG, taskId: task1._id, msg })
    console.log('After ADD_TASK_MSG:', state)

    state = taskReducer(state, { type: REMOVE_TASK, taskId: task1._id })
    console.log('After REMOVE_TASK:', state)
}

