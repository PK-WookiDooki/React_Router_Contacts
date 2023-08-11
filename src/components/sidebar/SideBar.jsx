import { BsSearch } from "react-icons/bs";
import ContactLink from "./ContactLink";
import "./link.css";
import { CButton } from "..";
import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setKeyword } from "../../features/services/contactsSlice";
import { useEffect, useState } from "react";

const SideBar = ({ contacts }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [searchedContacts, setSearchedContacts] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const orderedContacts = contacts
            ?.slice()
            .sort((a, b) => a.name.localeCompare(b.name));

        const filterSearched = orderedContacts?.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );

        search.trim().length > 0
            ? setSearchedContacts(filterSearched)
            : setSearchedContacts(orderedContacts);
    }, [search, contacts]);

    const handleChange = (e) => {
        dispatch(setKeyword(e.target.value));
        setSearch(e.target.value);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setSearch("");
        dispatch(setKeyword(""));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim().length > 0) {
            nav("/");
        }
    };

    return (
        <aside
            className="bg-gray-300 min-w-max h-screen flex flex-col sticky top-0
        "
        >
            <div className="font-bold text-xl p-3 text-center border-t border-black/20 backdrop-blur-md">
                <Link
                    to={"/"}
                    className=" bg-gradient-to-b from-[#f53844] to-[#42378f] bg-clip-text text-transparent"
                >
                    React Router Contacts
                </Link>
            </div>
            <div className="flex gap-3 border-black/20 p-3 border-b ">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="relative">
                        <BsSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            type="text"
                            className=" outline-none bg-white text-black p-2 pl-7 rounded-md max-w-[200px] shadow-md"
                            placeholder="Search"
                            onChange={handleChange}
                            value={search}
                        />
                        <button
                            onClick={handleReset}
                            type="button"
                            className={` ${
                                search.trim().length > 0 ? " block" : "hidden"
                            } absolute right-2 top-1/2 transform -translate-y-1/2 z-[5]`}
                        >
                            <RxCross1 />
                        </button>
                    </div>
                </form>
                <CButton title={"new"} path={"create_contact"} />
            </div>

            <nav className="flex flex-col gap-2 p-3 overflow-y-scroll bg-gray-200 h-full">
                {searchedContacts?.map((contact) => {
                    return (
                        <ContactLink
                            key={contact.id}
                            id={contact.id}
                            name={contact.name}
                        />
                    );
                })}
            </nav>
        </aside>
    );
};

export default SideBar;
