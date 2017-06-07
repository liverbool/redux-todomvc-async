import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'
import TodoService from './services/todo-service'

const store = createStore(reducer, {}, applyMiddleware(TodoService))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

store.dispatch({type: 'GET_TODO_DATA'})
