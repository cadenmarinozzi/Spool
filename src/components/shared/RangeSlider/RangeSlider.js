import { Component, createRef } from 'react';
import classnames from 'classnames';
import './RangeSlider.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RangeSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			minVal: props.min,
			maxVal: props.max,
			minValRef: createRef(),
			maxValRef: createRef(),
			rangeRef: createRef(),
		};
	}

	getPercent(value) {
		return Math.round(
			((value - this.props.min) / (this.props.max - this.props.min)) * 100
		);
	}

	handleUpdate() {
		if (this.state.minValRef.current) {
			const minPercent = this.getPercent(
				+this.state.minValRef.current.value
			);
			const maxPercent = this.getPercent(this.state.maxVal);

			if (this.state.rangeRef.current) {
				this.state.rangeRef.current.style.width = `${
					maxPercent - minPercent
				}%`;
			}
		}

		if (this.state.maxValRef.current) {
			const minPercent = this.getPercent(this.state.minVal);
			const maxPercent = this.getPercent(
				+this.state.maxValRef.current.value
			);

			if (this.state.rangeRef.current) {
				this.state.rangeRef.current.style.left = `${minPercent}%`;
				this.state.rangeRef.current.style.width = `${
					maxPercent - minPercent
				}%`;
			}
		}

		if (this.props.onChange) {
			this.props.onChange(this.state.minVal, this.state.maxVal);
		}
	}

	componentDidMount() {
		this.handleUpdate.call(this);
	}

	render() {
		return (
			<div className="range-slider">
				<div className="range-slider-header">
					{this.props.icon && (
						<div className="range-slider-icon">
							<FontAwesomeIcon icon={this.props.icon} />
						</div>
					)}
					<h1 className="range-slider-text">{this.props.text}</h1>
				</div>
				<div className="range-slider-container">
					<input
						type="range"
						min={this.props.min}
						max={this.props.max}
						value={this.state.minVal}
						ref={this.state.minValRef}
						onChange={(event) => {
							const value = Math.min(
								+event.target.value,
								this.state.maxVal - 1
							);

							this.setState(
								{
									minVal: value,
								},
								this.handleUpdate.bind(this)
							);

							event.target.value = value.toString();
						}}
						className={classnames('thumb thumb--zindex-3', {
							'thumb--zindex-5':
								this.state.minVal > this.props.max - 100,
						})}
					/>
					<input
						type="range"
						min={this.props.min}
						max={this.props.max}
						value={this.state.maxVal}
						ref={this.state.maxValRef}
						onChange={(event) => {
							const value = Math.max(
								+event.target.value,
								this.state.minVal + 1
							);

							this.setState(
								{
									maxVal: value,
								},
								this.handleUpdate.bind(this)
							);

							event.target.value = value.toString();
						}}
						className="thumb thumb--zindex-4"
					/>

					<div className="slider">
						<div className="slider__track" />
						<div
							ref={this.state.rangeRef}
							className="slider__range"
						/>
						<div className="slider__left-value">
							{this.state.minVal}
						</div>
						<div className="slider__right-value">
							{this.state.maxVal}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RangeSlider;
