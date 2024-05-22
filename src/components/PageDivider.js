import React from "react";
import "../App.css";
import { NavLink } from 'react-router-dom';

export function PageDivider(props) {
    return (
        <div className="page-divider">{props.name.toUpperCase()}</div>
    )
}
