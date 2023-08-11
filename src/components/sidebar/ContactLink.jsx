import React from "react";
import { NavLink } from "react-router-dom";

const ContactLink = ({ id, name }) => {
    return (
        <NavLink
            className="c-link w-full rounded-md p-2 duration-300"
            to={`/contacts/${id}`}
        >
            {name}
        </NavLink>
    );
};

export default ContactLink;
