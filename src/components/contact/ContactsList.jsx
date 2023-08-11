import { useEffect, useState } from "react";
import { useGetAllContactsQuery } from "../../features/apis/contactApi";
import CCard from "./CCard";
import { useSelector } from "react-redux";

const filteringContactByKeyword = (contactsArr, keyword) => {
    return contactsArr.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
    );
};

const filteringContactByFavorite = (contactsArr, condition) => {
    return contactsArr?.filter((item) => item.favorite === condition);
};

const ContactsList = () => {
    const [filter, setFilter] = useState("all");
    const [contactsList, setContactsList] = useState([]);
    const { data: contacts, isLoading, isFetching } = useGetAllContactsQuery();
    const { keyword } = useSelector((state) => state.contacts);

    useEffect(() => {
        if (contacts) {
            const orderedContacts = contacts
                .slice()
                .sort((a, b) => b.id - a.id);
            setContactsList(orderedContacts);
            const favoriteContacts = filteringContactByFavorite(
                orderedContacts,
                true
            );
            const unfavoriteContacts = filteringContactByFavorite(
                orderedContacts,
                false
            );
            if (filter === "favorite") {
                const isSearchInFav = filteringContactByKeyword(
                    favoriteContacts,
                    keyword
                );
                keyword.trim().length < 0
                    ? setContactsList(favoriteContacts)
                    : setContactsList(isSearchInFav);
            } else if (filter === "unfavorite") {
                const isSearchInUnFav = filteringContactByKeyword(
                    unfavoriteContacts,
                    keyword
                );
                keyword.trim().length < 0
                    ? setContactsList(unfavoriteContacts)
                    : setContactsList(isSearchInUnFav);
            } else {
                const searchedContacts = filteringContactByKeyword(
                    orderedContacts,
                    keyword
                );
                keyword.trim().length < 0
                    ? setContactsList(orderedContacts)
                    : setContactsList(searchedContacts);
            }
        }
    }, [filter, contacts, keyword]);

    const handleFilter = (value) => {
        setFilter(value);
    };

    if (isLoading || isFetching) {
        return (
            <div className="text-center p-3 h-full flex items-center justify-center">
                <p className="text-3xl font-bold">
                    {" "}
                    Loading . . . Please Wait!{" "}
                </p>
            </div>
        );
    }

    return (
        <section className="p-3 flex flex-col gap-5 h-full">
            <div className="flex items-center gap-5 justify-center">
                <button
                    onClick={() => handleFilter("all")}
                    className={`font-semibold ${
                        filter === "all" ? "opacity-100" : "opacity-50"
                    } hover:opacity-100 duration-200`}
                >
                    All Contacts
                </button>
                <button
                    onClick={() => handleFilter("favorite")}
                    className={`font-semibold ${
                        filter === "favorite" ? "opacity-100" : "opacity-50"
                    } hover:opacity-100 duration-200`}
                >
                    Favorite Contacts
                </button>
                <button
                    onClick={() => handleFilter("unfavorite")}
                    className={`font-semibold ${
                        filter === "unfavorite" ? "opacity-100" : "opacity-50"
                    } hover:opacity-100 duration-200`}
                >
                    Un-Favorite Contacts
                </button>
            </div>

            {contactsList?.length <= 0 ? (
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-center text-red-600 font-bold">
                        <h2 className="text-5xl mb-5">Oops!</h2>
                        <p className="text-2xl ">
                            {" "}
                            Sorry, there is no contact with the name
                            {` "${keyword}"`}.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center flex-wrap gap-5">
                    {contactsList?.map((item) => {
                        return <CCard key={item.id} contact={item} />;
                    })}
                </div>
            )}
        </section>
    );
};

export default ContactsList;
