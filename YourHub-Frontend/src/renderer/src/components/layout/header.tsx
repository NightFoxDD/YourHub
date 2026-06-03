import UserMenu from "../userMenu";
import { useState } from "react";

export default function Header(){
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return(
        <header className="">
            <div className="flex flex-col p-4 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800/50">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4 cursor-pointer" onClick={(e) => {e.stopPropagation(); setIsUserMenuOpen(!isUserMenuOpen)}}>
                        <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center text-white shrink-0">
                            Y   
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="text-xl font-bold text-zinc-900 dark:text-white truncate">YourHub</h1>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">Welcome back, John!</p>
                        </div>
                    </div>
                </div>
                
                {/* Accordion Menu */}
                <div className={`grid transition-all duration-300 ease-in-out ${isUserMenuOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}