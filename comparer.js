import { readFileSync } from "fs";
import chalk from "chalk";

let list_bonds = JSON.parse(readFileSync("bond-list.json"));

let filled_list = JSON.parse(readFileSync("filled-list.json"));
let available_list = JSON.parse(readFileSync("available-list.json"));

// YAHA CHOSE KR SKTE H
let chosen_list = filled_list;
let one_college_name = "";
const print_table = false;
let table = []
// YAHA CHOSE KR SKTE THE

if (one_college_name == "") {
	chosen_list.forEach((obj,i) => {
		dhundho(i, obj["name"], print_table);
	});
} else {
	dhundho(0, one_college_name, print_table);
}

function dhundho(id, org_name, table_print_kare_kya) {
	let found = 0;
	let name = org_name.toLowerCase();
	for(let list of list_bonds) {
		let listed_name = list["name"].toLowerCase();

		if( listed_name.includes(name) || name.includes(listed_name) ) {
			if ( list["bond_available"] ) {
				table.push({ID: id+1, Name: org_name, Bond: "BOND !"})
				if (!table_print_kare_kya)
					console.log(chalk.yellow(`${id+1}:`), chalk.yellow(org_name), chalk.bgYellow("Bond: "), list["bond_url"])
			} else {
				table.push({ID: id+1, Name: org_name})
				if (!table_print_kare_kya)
					console.log(`${id+1}:`, org_name)
			}
			found += 1;
		} 
	}

	if( found == 0 ) {
		table.push({ID: id+1, Name: org_name, Error: "NOT FOUND"})
		if (!print_table)
			console.log(`[${id+1}]`, chalk.red(org_name), chalk.bgRed("NOT FOUND"))
	}
}

if (print_table)
	console.table(table)

