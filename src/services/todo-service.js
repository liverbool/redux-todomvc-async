import ApiClient from './api-client'
import * as ATs from '../constants/ActionTypes'

const TodoService = store => dispatch => action => {
    dispatch(action)

    let client = new ApiClient(dispatch, 'http://localhost:3001');

    switch (action.type) {
        case ATs.GET_TODO_DATA:
            client.get('/todos', ATs.GET_TODO_DATA)
            break

        case ATs.DELETE_TODO:
            client.del(`/todos/${action.data.id}`, ATs.DELETE_TODO, action.data)
            break

        case ATs.COMPLETE_TODO:
            client.patch(`/todos/${action.data.id}`, ATs.COMPLETE_TODO, action.data)
            break

        case ATs.EDIT_TODO:
            client.patch(`/todos/${action.data.id}`, ATs.EDIT_TODO, action.data)
            break

        case ATs.ADD_TODO:
            const rec = {
                id: null,
                completed: false,
                text: action.text
            }
            client.post(`/todos`, ATs.ADD_TODO, rec)
            break

        default:
            break
    }
};

export default TodoService
