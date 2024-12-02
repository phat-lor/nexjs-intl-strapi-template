"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
	const [info, setInfo] = useState({
		host: "...",
		path: "...",
	});
	useEffect(() => {
		setInfo({
			host: window.location.host,
			path: window.location.pathname,
		});
	}, []);
	return (
		// Fall back in english incase anything fails
		<html suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Error Occured</title>
				<style>{`
					body {
						background-color: rgb(4, 5, 8);
						color: #aaaaaa;
						font-family: monospace;
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;
						height: 100vh;
						margin: 0;
						gap: 0.5rem;
					}

					#container {
						display: flex;
						justify-content: center;
						flex-direction: row;
						align-items: center;
						gap: 0.5rem;
					}

		

				`}</style>
			</head>

			<body>
				<div id="container">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-server-crash"
					>
						<path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
						<path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
						<path d="M6 6h.01" />
						<path d="M6 18h.01" />
						<path d="m13 6-4 6h6l-4 6" />
					</svg>
					<h1>|</h1>
					{error.message || "An error occurred"}
					<br />
					{"Host: " + info.host}
					<br />
					{"Path: " + info.path}
				</div>
				<Link href="/">Go back to home</Link>
				<Link href="#" onClick={reset}>
					Retry
				</Link>
			</body>
		</html>
	);
};

export default Error;
