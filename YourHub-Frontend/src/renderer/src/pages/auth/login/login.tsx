import { useNavigate } from "react-router-dom";
import { UI } from "../../../theme";
import { LogIn, UserPlus, Lock, Mail } from "lucide-react";
import { authApi } from "../../../api/authApi";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');

    
    async function handleLogin(){
        setError('');
        const user = {
            id: 0,
            username: email,
            email: email,
            password: password
        };
        try {
            console.log(user);
            const success = await authApi.login(user);
            localStorage.setItem('token', success);
            if (success) {
                navigate('/home');
            }
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        }
    }

    return (
        <div className={UI.pageContainer}>
            <div className={UI.glassCard}>
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <h1 className={UI.title}>Welcome Back</h1>
                    <p className={UI.subtitle}>Sign in to your account to continue</p>
                </div>
                
                <div className="space-y-4">
                    <div className={UI.inputWrapper}>
                        <label htmlFor="email" className={UI.label}>Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input 
                                className={`${UI.input} pl-10`} 
                                type="email" 
                                placeholder="name@example.com" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className={UI.inputWrapper}>
                        <label htmlFor="password" className={UI.label}>Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input 
                                className={`${UI.input} pl-10`} 
                                type="password" 
                                placeholder="••••••••" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-red-500 dark:text-red-400">{error}</div>
                    <div className="pt-2">
                        <button onClick={handleLogin} className={UI.buttonPrimary}>
                            Sign In
                            <LogIn className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
                
                <div className={UI.divider}>
                    <span className={UI.dividerText}>or</span>
                </div>
                
                <button onClick={() => navigate('/register')} className={UI.buttonSecondary}>
                    <UserPlus className="w-4 h-4" />
                    Create an account
                </button>
            </div>
        </div>
    );
}
