import { UI } from "../theme";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className={UI.pageContainer}>
            <div className="flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
                <h1 className="text-xl font-medium text-zinc-700 dark:text-zinc-300 animate-pulse">Loading...</h1>
            </div>
        </div>
    );
}