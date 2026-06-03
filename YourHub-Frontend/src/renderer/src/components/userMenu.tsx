import { Link } from "react-router-dom"
import { authApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
export default function UserMenu(){
    const navigate = useNavigate();
    async function handleLogout(){
        await authApi.logOut();
        navigate('/login');
    }
    return(
        <div className="w-full bg-transparent">
            <ul className="flex flex-col space-y-1">
                <li>
                    <Link to="/user" className="block px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors">Profile</Link>
                </li>
                <li>
                    <Link to="/user/options" className="block px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors">Options</Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="block px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors w-full text-left">Log out</button>
                </li>
            </ul>
        </div>
    )
}