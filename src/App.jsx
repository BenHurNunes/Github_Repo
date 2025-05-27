import { useState } from "react";
import "./app.css";

function App() {
	const [username, setUsername] = useState("");
	const [repos, setRepos] = useState([]);

	const fetchRepos = async () => {
		if (!username) {
			alert("Please enter a Github username");
			return;
		}
		const response = await fetch(
			`https://api.github.com/users/${username}/repos`,
		);
		const data = await response.json();
		setRepos(data);
	};

	return (
		<div className="container">
			<h1 className="h1">Search for a Github user</h1>
			<div className="input-container">
				<input
					className="input"
					type="text"
					placeholder="Enter a Github username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button className="search-button" type="button" onClick={fetchRepos}>
					Search
				</button>
			</div>
			<ul className="ul">
				{repos.map((repos) => (
					<li className="li" key={repos.id}>
						<h3 className="h3">{repos.name}</h3>
						<p className="p">{repos.description || "No description"}</p>
						<p>🌟 {repos.stargazers_count}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
