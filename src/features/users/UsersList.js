import { useGetCartContentQuery, useGetCartInfoQuery, useGetUserDetailsQuery } from "./usersApiSlice"
import { Link } from "react-router-dom";

const UsersList = () => {
    const {
        data: cart,
    } = useGetCartContentQuery();

    const {
        data: info,
    } = useGetCartInfoQuery();

    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserDetailsQuery();

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
            <section className="users">
                <h1>Users List</h1>
                <ul>
                    {JSON.stringify(user)}
                    {cart && JSON.stringify(cart)}
                    {info && JSON.stringify(info)}
                </ul>
                <Link to="/">Back to Home page</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
export default UsersList