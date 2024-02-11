import { useState } from 'react'
function Form({ value, onSave }) {
	const [inputText, setInputText] = useState(value)
	const onChangeTitle = e => {
		setInputText(e.target.value)
	}
	const saveText = () => {
		onSave(inputText)
	}
	return (
		<div className='modal-input'>
			<input
				value={inputText}
				placeholder='Введите изменения'
				onChange={onChangeTitle}
			/>
			<button onClick={saveText}>Сохранить</button>
		</div>
	)
}

export default Form
