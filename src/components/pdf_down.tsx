import React, { useEffect, useState } from "react";
import "../styles/pdf_down.css";
import list_bonds from "../data/bond-list.json";

/**
 * The file object, we get from firebase looks like this
 * 
 * NOTE-  the `link` and `metadata` are NOT returned by firebase, you have to call another function to get them, that's why we have promises here
 */
interface PdfProps {
    name: string,
    id: number
};

export default function PdfDown(props: PdfProps) {
    const [bond_link, setBondLink] = useState(null);
    const NOT_FOUND_STR = "NAME NOT FOUND !";

    useEffect(() => {
        let found = 0;
        const name = props.name.toLowerCase();
        for (const list of list_bonds) {
            let listed_name = list["name"].toLowerCase();

            if (listed_name.includes(name) || name.includes(listed_name)) {
                if (list["bond_available"]) {
                    setBondLink(list["bond_url"])
                }
                found += 1;
            }

            // Try till the first entry that has bond_link != null
            if (bond_link !== null) break;
        }

        if (found == 0) {
            setBondLink(NOT_FOUND_STR);
        }
    }, [props.name]);

    return (
        <tr className="pdf_down">
            <td className="centered">{props.id}</td>
            <td>
                <span className="pdf_name">
                    {props.name}
                </span>
            </td>
            <td className="centered">
                {
                    bond_link === NOT_FOUND_STR ? (
                        <p style={{ color: "red" }}>NOT FOUND !</p>
                    ) : (
                        <a download href={bond_link}>
                            {bond_link !== null ? "Bond Link" : "-"}
                        </a>
                    )
                }
            </td>
        </tr>
    )
}
