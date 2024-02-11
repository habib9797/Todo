import { useState } from 'react'
import './App.css'
import Form from './components/Form'

function App() {
	const [todo, setTodo] = useState([])
	const [selectedId, setSelectedId] = useState('')
	const [edit, setEdit] = useState(false)
	const [inputText, setInputText] = useState('')

	const handleTodo = e => {
		setInputText(e.target.value)
	}
	const addTodo = () => {
		if (inputText.trim() === '') {
			return
		}
		const newTodo = {
			text: inputText,
			id: Date.now(),
			completed: false,
		}
		setTodo([...todo, newTodo])
		setInputText('')
	}

	const deleteTodo = id => {
		const newTodo = todo.filter(item => item.id !== id)
		setTodo(newTodo)
	}

	const allDelete = () => {
		setTodo([])
	}
	const handleChange = id => {
		console.log(id)
		setTodo(
			todo.map(item => {
				if (item.id === id) {
					return { ...item, completed: !item.completed }
				} else {
					return item
				}
			})
		)
	}
	const handlekeyDown = event => {
		if (event.key === 'Enter') {
			addTodo()
		}
	}
	const editTodo = id => {
		setSelectedId(id)
		setEdit(!edit)
	}
	const onSave = (inputText, id) => {
		setTodo(
			todo.map(item => {
				if (item.id === id) {
					return { ...item, text: inputText }
				} else {
					return item
				}
			})
		)
		setEdit(false)
	}

	return (
		<div className='body-main'>
			<div className='addlist'>
				<input
					onChange={handleTodo}
					value={inputText}
					type='text'
					placeholder='Введите запись'
					onKeyDown={handlekeyDown}
				/>
				<button onClick={addTodo}>Добавить запись</button>
				<button onClick={allDelete}>Удалить полностью</button>
			</div>
			<div className='formlist'>
				<h2>Мои задачи</h2>
				<ul>
					{todo.map(item => (
						<li key={item.id}>
							<input
								className='check'
								type='checkbox'
								checked={item.completed}
								onChange={() => handleChange(item.id)}
							/>
							{edit && selectedId === item.id ? (
								<Form
									value={item.text}
									onSave={inputText => onSave(inputText, item.id)}
								/>
							) : (
								<span
									style={{
										textDecoration: item.completed ? 'line-through' : 'none',
									}}
								>
									{item.text}
								</span>
							)}

							<button onClick={() => deleteTodo(item.id)}>
								Удалить запись
							</button>
							<button onClick={() => editTodo(item.id)}>
								{edit ? 'Отмена' : 'Изменить запись'}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default App
