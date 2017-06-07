import {COMPLETE_ALL, CLEAR_COMPLETED} from '../constants/ActionTypes'
import * as ATs from '../constants/ActionTypes'

const reject = (records, action) => {
    records.some(data => {
        if (data.id === action.data.id) {
            Object.assign(data, action.snapshort)

            return true
        }

        return false
    })

    return records
}

const snapshort = (records, action) => {
    records.some(data => {
        if (data.id === action.data.id) {
            data._snapshort = data

            return true
        }

        return false
    })

    return records
}

export default function todos(records = [], action) {
    switch (action.type) {
        // Not suppport in demo server
        case COMPLETE_ALL:
            const areAllMarked = records.every(rec => rec.completed)

            return records.map(rec => ({
                ...rec,
                completed: !areAllMarked
            }))

        // Not suppport in demo server
        case CLEAR_COMPLETED:
            return records.filter(rec => rec.completed === false)

        case ATs.GET_TODO_DATA_DONE:
            return action.data

        case ATs.COMPLETE_TODO_FAIL:
        case ATs.EDIT_TODO_FAIL:
            return reject(records, action)

        case ATs.EDIT_TODO_DONE:
        case ATs.COMPLETE_TODO_DONE:
            snapshort(records, action)

            return records

        case ATs.DELETE_TODO_DONE:
            return records.filter(rec => rec.id !== action.data.id)

        case ATs.ADD_TODO_DONE:
            return [action.data, ...records]

        case ATs.DELETE_TODO_FAIL:
        case ATs.GET_TODO_DATA_FAIL:
        default:
            return records
    }
}
