export const UI = {
  // Layouts
  pageContainer: "min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500",
  glassCard: "relative w-full max-w-md p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 shadow-2xl transition-all duration-500",
  
  // Typography
  title: "text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100",
  subtitle: "text-sm text-zinc-500 dark:text-zinc-400 mt-2 mb-8",
  label: "block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2",
  
  // Inputs
  inputWrapper: "relative group mb-5",
  input: "w-full px-4 py-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300",
  
  // Buttons
  buttonPrimary: "w-full py-3 px-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 active:scale-[0.98]",
  buttonSecondary: "w-full py-3 px-4 flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all duration-300 active:scale-[0.98]",
  
  // Utilities
  divider: "flex items-center w-full my-6 before:flex-1 before:border-t before:border-zinc-200 dark:before:border-zinc-800 after:flex-1 after:border-t after:border-zinc-200 dark:after:border-zinc-800",
  dividerText: "px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider",
};
