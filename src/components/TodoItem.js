import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.object.isRequired,
        editTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired
    }

    state = {
        editing: false,
    }

    handleDoubleClick = () => {
        this.setState({editing: true})
    }

    handleCompleteToggle = () => {
        this.props.todo.completed = !this.props.todo.completed
        this.props.completeTodo(this.props.todo)
    }

    handleSave = (id, text) => {
        this.setState({editing: false})

        if (text.length === 0) {
            this.props.deleteTodo(this.props.todo)

            return
        }

        if (this.props.todo._snapshort.text !== text) {
            this.props.todo.text = text
            this.props.editTodo(this.props.todo)
        }
    }

    render() {
        const {todo, deleteTodo} = this.props
        let element

        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.text}
                               editing={this.state.editing}
                               onSave={(text) => this.handleSave(todo.id, text)}/>
            )
        } else {
            element = (
                <div className="view">
                    <input className="toggle"
                           type="checkbox"
                           checked={todo.completed}
                           onChange={this.handleCompleteToggle}/>
                    <label onDoubleClick={this.handleDoubleClick}>
                        {todo.text}
                    </label>
                    <button className="destroy"
                            onClick={() => deleteTodo(todo)}/>
                </div>
            )
        }

        return (
            <li className={classnames({
                completed: todo.completed,
                editing: this.state.editing
            })}>
                {element}
            </li>
        )
    }
}
