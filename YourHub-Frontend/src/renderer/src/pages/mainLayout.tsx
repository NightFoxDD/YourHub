import { Outlet } from "react-router-dom";
import Menu from "../components/sideMenu/menu";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
            <Menu />
            <main className="flex-1 relative overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
