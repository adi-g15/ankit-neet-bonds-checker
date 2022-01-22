import React from 'react';
import "../styles/global.css";

interface FooterProps {
};

export default function NavBar(props: FooterProps) {
	return (
		<footer className="centered">
			<hr style={{width: '60%'}} />
			<div>
				Github: <a href='https://github.com/adi-g15/NEET-Bond-Checker'>adi-g15/neet-bond-checker</a>
			</div>
		</footer>
	);
}
