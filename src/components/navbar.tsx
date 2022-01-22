import React from 'react';
import "../styles/global.css";

interface NavbarProps {
	title: string
};

export default function NavBar(props: NavbarProps) {
	return (
		<header className="centered">
			<h1>
				<a href="/" style={{textDecoration: "inherit", color: "inherit"}}>{props.title}</a>
			</h1>
		</header>
	);
}
