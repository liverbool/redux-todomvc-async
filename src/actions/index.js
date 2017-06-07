import * as ATs from '../constants/ActionTypes'

export const addTodo = (text) => ({type: ATs.ADD_TODO, text})
export const deleteTodo = (rec) => ({type: ATs.DELETE_TODO, data: rec})
export const editTodo = (rec) => ({type: ATs.EDIT_TODO, data: rec})
export const completeTodo = (rec) => ({type: ATs.COMPLETE_TODO, data: rec})
export const completeAll = () => ({type: ATs.COMPLETE_ALL})
export const clearCompleted = () => ({type: ATs.CLEAR_COMPLETED})
