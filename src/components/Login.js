export default function Login(props) {
	return (
		<div>
			<h2>
				{!props.isLogged
					? "Click below button to Log In"
					: "Click below button to Log Out"}
			</h2>
			<button onClick={props.login}>
				{!props.isLogged ? "Log In" : "Log Out"}
			</button>
		</div>
	);
}
