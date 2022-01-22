import React, { useRef } from "react";
import "../styles/pdf_down.css";

/**
 * The file object, we get from firebase looks like this
 * 
 * NOTE-  the `link` and `metadata` are NOT returned by firebase, you have to call another function to get them, that's why we have promises here
 */
interface ZipProps {
    name: string,
    clickHandler: Function,
    gridWidth?: [number, number],
    disabled?: boolean
};

export default function UnitZip(props: ZipProps) {
    return (
        <div className="unit_zip" style={ props.gridWidth ? {gridColumnStart: props.gridWidth[0], gridColumnEnd: props.gridWidth[1]} : {} }>
            <button
				onClick={() => props.clickHandler()}
				disabled={props.disabled === true}
			>
				<a href={"#"}>
					{props.name}
				</a>
			</button>
        </div>
    )
}
