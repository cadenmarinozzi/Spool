import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

function Button(props) {
	return (
		<button
			className={`button${props.small ? ' button-small' : ''}`}
			onClick={props.onClick}>
			{props.customIcon ? (
				<div className="left-icon icon">{props.customIcon}</div>
			) : (
				props.icon && (
					<FontAwesomeIcon
						className="left-icon icon"
						icon={props.icon}
					/>
				)
			)}
			{props.children}
			{props.rightIcon && (
				<FontAwesomeIcon
					className="right-icon icon"
					icon={props.rightIcon}
				/>
			)}
		</button>
	);
}

export default Button;
