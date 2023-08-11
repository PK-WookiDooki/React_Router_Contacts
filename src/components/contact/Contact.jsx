import { Form, useNavigate, useParams } from "react-router-dom";
import { CButton } from "..";
import { BsStar, BsStarFill } from "react-icons/bs";
import {
    useDeleteContactMutation,
    useGetContactByIdQuery,
    useSetFavoriteMutation,
} from "../../features/apis/contactApi";

const Contact = () => {
    const { contactId } = useParams();
    const { data: contact } = useGetContactByIdQuery(contactId);
    const [setFavorite] = useSetFavoriteMutation();
    const [deleteContact] = useDeleteContactMutation();
    const nav = useNavigate();
    const handleDelete = async () => {
        try {
            const { data } = await deleteContact(contact?.id);
            if (data) {
                nav("/");
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleFavorite = async () => {
        const updatedContact = { ...contact, favorite: !contact.favorite };
        try {
            const { data } = await setFavorite({
                id: contact?.id,
                contact: updatedContact,
            });
            if (data) {
                nav(`/contacts/${contact?.id}`);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="h-full">
            <section className="flex flex-col lg:flex-row text-center lg:text-left items-center gap-3 p-3 bg-black/10 rounded-md ">
                <div className="min-w-[208px] max-w-[208px] h-52 rounded-md overflow-hidden">
                    <img
                        src={
                            contact?.avatar !== undefined
                                ? contact?.avatar
                                : "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                        }
                        alt={contact?.name}
                        className=" object-cover object-center h-full w-full"
                    />
                </div>
                <div className=" flex flex-col gap-3">
                    <div className="flex items-center gap-2 justify-center lg:justify-normal">
                        <h2 className="font-bold text-3xl capitalize">
                            {contact?.name ? contact?.name : "Unknown"}
                        </h2>
                        <button
                            onClick={handleFavorite}
                            className=" text-yellow-400 text-xl"
                        >
                            {contact?.favorite ? <BsStarFill /> : <BsStar />}
                        </button>
                    </div>

                    {contact?.phone ? (
                        <a
                            className=" md:pointer-events-none "
                            href={`tel:${contact?.phone}`}
                        >
                            {" "}
                            {contact?.phone}{" "}
                        </a>
                    ) : (
                        ""
                    )}

                    {contact?.notes ? <p> {contact?.notes} </p> : ""}

                    <div className="flex gap-3 justify-center lg:justify-normal">
                        <Form action="edit">
                            <CButton
                                title={"edit"}
                                path={`/contacts/${contact?.id}/edit`}
                            />
                        </Form>
                        <Form
                            method="post"
                            action="destroy"
                            onSubmit={(event) => {
                                if (
                                    !confirm(
                                        "Please confirm you want to delete this record."
                                    )
                                ) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <CButton title={"delete"} event={handleDelete} />
                        </Form>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Contact;
