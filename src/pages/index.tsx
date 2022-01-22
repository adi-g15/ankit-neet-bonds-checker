import React, { useEffect, useState } from 'react';
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import PDFDown from "../components/pdf_down";
import "../styles/global.css";
import UnitZip from "../components/unitzip";
import list_bonds from "../data/bond-list.json";

import Helmet from "react-helmet";

/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
 if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr){

		// If a regex pattern
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);

	};
}

export default function CS4401() {
	const [college_name, set_college_name] = useState("");
	const [colleges, setColleges] = useState([]);			// array of pdfs (each being a File)
	const [search_by_college, setSearchByCollege] = useState(false);
	const [filled_choices, setFilledChoices] = useState([]);
	const [parseError, setParseError] = useState(false);

	useEffect(() => {
		setColleges(
			list_bonds
				.filter(obj => (
					(obj["name"].toLowerCase().includes(college_name.toLowerCase())) ||
					(college_name.toLowerCase().includes(obj["name"].toLowerCase()))
				))
				.map(obj => ({ name: obj.name }))
		);

		// GetListService(storageRef.child("cs4401/")).then(data => {
		// 	setFiles(data.storedFiles);
		// })
	}, [college_name]);

	useEffect(() => {
		if (search_by_college === false) {
			setColleges([]);
		} else {
			set_college_name("");
			setColleges(
				list_bonds
					.map(obj => ({ name: obj.name }))
			);
		}
	}, [search_by_college]);

	useEffect(() => {
		setColleges(filled_choices.map(obj => ({ name: obj["name"] })));
	}, [filled_choices])

	return (
		<>
			<div className="application">
				<Helmet>
					<meta charSet="utf-8" />
					<meta name="description" content="NEET Bond Checker" />
					<meta name="theme-color" content="#20b2aa" />
					<meta name="lang" content="en" />
					<title>NEET Bond Checker</title>
				</Helmet>
			</div>
			<NavBar title="NEET Bond Checker" />

			<div className="container">
				<div className="unit_container">
					<UnitZip
						name={"Search filled choices"}
						clickHandler={() => setSearchByCollege(false)}
						gridWidth={[0, 1]}
						disabled={search_by_college === false}
					/>
					<UnitZip
						name={"Search by college name"}
						clickHandler={() => setSearchByCollege(true)}
						gridWidth={[1, 2]}
						disabled={search_by_college === true}
					/>
				</div>
				<hr className="separation" />
				{
					search_by_college ? (
						<div className="centered">
							{"Enter college name:  "}
							<input type="text" value={college_name} onChange={(e) => set_college_name(e.target.value)} required />
						</div>
					) : (<>
						<div className="centered">
							{"Follow simple instructions here: "}
							<a href='/help'>Help</a>
						</div>
						<div className="centered">Paste copied object as told in instructions: </div>
						<div className="centered">
							<textarea
								style={{
									border: "none",
									width: "20vw",
									borderBottom: "0.5vh solid blue",
									padding: "5px 8px",
									transition: "0.5s",
									marginRight: "1.8vw",
								}}
								onChange={(e) => {
									try {
										let s = e.target.value;
										s = s.replaceAll("\\", "");
										s = s.substring(1, s.length - 1);
										const choices = JSON.parse(s); choices.shift();
										console.debug({ choices });
										setFilledChoices(choices);
										setParseError(false);
									} catch {
										setParseError(true);
									}
								}
								}
							/>
							{parseError && (<div style={{ color: "red" }}>Invalid object, try again</div>)}
						</div>
						<hr className="separation" />
					</>)
				}

				<div className="centered">Note: Saare bonds study ke baad mandatory service ke nhi hai, kai sirf college chhodne par fine ka hi hai bas</div>
				<hr className="separation" />
				<br />

				<table>
					<thead>
						<tr>
							<th>No.</th>
							<th style={{ float: "left" }}>Name</th>
							<th>Bond/Errors</th>
						</tr>
					</thead>
					<tbody>
						{colleges.map((value, index) => (
							<PDFDown
								name={value.name}
								key={index}
								id={index + 1}
							/>
						)
						)}
					</tbody>
				</table>
			</div>
			<Footer />
		</>
	);
}
