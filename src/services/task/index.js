const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { taskService as local } from './task.service.local'
import { taskService as remote } from './task.service.remote'

function getEmptyTask() {
	return {
		title: makeId(),
		importance: getRandomIntInclusive(1, 3),
	}
}

function getDefaultFilter() {
    return {
        txt: '',
        minImportance: '',
        status: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const taskService = { getEmptyTask, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.taskService = taskService
