export default function Button({ className, onClick, label, rest }) {
	return (
		<button
			className={`bg-blue-500 text-white p-1 rounded ${className}`}
			onClick={onClick}
			{...rest}
		>
			{label}
		</button>
	);
}
