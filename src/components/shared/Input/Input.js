import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';
import './Input.scss';

function Input(props) {
	const id = uuid();

	return (
		<div className="input-container">
			{props.icon && (
				<FontAwesomeIcon className="input-icon" icon={props.icon} />
			)}
			<input
				className="input"
				id={id}
				ref={props.inputRef}
				value={props.value}
				placeholder={props.placeholder}
				onKeyUpCapture={(event) => {
					props.onInput(event.target.value);
				}}
			/>
			<label htmlFor={id} className="input-label">
				{props.text}
			</label>
		</div>
	);
}

export default Input;
