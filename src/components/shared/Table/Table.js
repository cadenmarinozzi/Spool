function Table(props) {
	return (
		<div className="table">
			{props.items.map((item, index) => {
				return (
					<div className="table-item" key={index}>
						{item}
					</div>
				);
			})}
		</div>
	);
}

export default Table;
