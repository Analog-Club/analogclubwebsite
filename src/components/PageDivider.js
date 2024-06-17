import React from "react";
import "../App.css";

export function PageDivider(props) {
    var text = props.name
    if (text === undefined) {
        text = ""
    }
    return (
        <div className="page-divider">{text.toUpperCase()}</div>
    )
}
