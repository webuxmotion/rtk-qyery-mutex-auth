import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Public = () => {
    const isUser = useSelector(state => state.auth.token);

    const content = (
        <section className="public">
            <header>
                <h1>Ласкаво просимо до демо авторизації</h1>
            </header>
            <footer>
                {isUser 
                    ? <Link to="/userslist">Профіль</Link> 
                    : <Link to="/login">Увійти</Link> 
                }
            </footer>
        </section>

    )
    return content
}
export default Public