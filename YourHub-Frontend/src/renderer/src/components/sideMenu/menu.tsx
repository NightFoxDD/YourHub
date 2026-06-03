import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import Header from '../../components/layout/header';
export default function Menu(){
    return(
        <aside className="flex flex-col w-64 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
            <Header/>
            <nav className="flex-1 px-2 py-4 space-y-2">
                <Link to="/home" className="flex items-center px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <Home className="w-5 h-5 mr-3" />
                    Home
                </Link>
            </nav>
        </aside>
    )
}