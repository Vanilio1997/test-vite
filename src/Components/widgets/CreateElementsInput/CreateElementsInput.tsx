import IconButton from '@/Components/ui/IconButton'
import ToggleIcon from '@/Components/ui/ToggleIcon'
import toggleOpenIcon from '@/icons/down.svg?react'
import toggleHideIcon from '@/icons/up.svg?react'
import createIcon from '@/icons/create.svg?react'
import { IconProp } from '@/types'
import React, { useState, useRef } from 'react'
import * as styles from './CreateElementsInput.module.css'

interface ICreateElementsInput {
	isTasksVisible: boolean
	toggleTasksVisible: () => void
	onCreate: (value: string) => void
	buttonLabel?: string
	placeholder?: string
	buttonIcon?: IconProp
	buttonType?: 'text' | 'icon'
}

const CreateElementsInput = ({
	isTasksVisible,
	toggleTasksVisible,
	onCreate,
	buttonType = 'text',
	buttonLabel = 'Add',
	placeholder = 'What needs to be done?',
	buttonIcon = createIcon,
}: ICreateElementsInput) => {
	const [inputValue, setInputValue] = useState<string>('')
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			handleAdd()
		}
	}

	const handleAdd = () => {
		if (inputValue.trim()) {
			onCreate(inputValue)
			setInputValue('')
			inputRef.current?.focus()
		}
	}

	return (
		<div
			ref={containerRef}
			className={`${styles.inputWrapper} ${
				isFocused ? `${styles.focused}` : ''
			}`}
			tabIndex={-1}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		>
			<div className={styles.inputIconContainer}>
				<ToggleIcon
					isHidedElements={isTasksVisible}
					toggleFunc={toggleTasksVisible}
					hideIcon={{ icon: toggleHideIcon }}
					showicon={{ icon: toggleOpenIcon }}
				/>

				<div className={styles.inputСontent}>
					<input
						ref={inputRef}
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						className={styles.elementsInput}
					/>
				</div>
			</div>
			{inputValue &&
				(buttonType === 'text' ? (
					<button onClick={handleAdd} className={styles.addButton}>
						{buttonLabel}
					</button>
				) : (
					<IconButton
						ariaLabel='create'
						onClick={handleAdd}
						icon={buttonIcon}
					/>
				))}
		</div>
	)
}

export default CreateElementsInput
