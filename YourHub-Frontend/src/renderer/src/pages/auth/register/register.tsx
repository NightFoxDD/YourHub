import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UI } from "../../../theme";
import { UserPlus, LogIn, Mail, Lock, User } from "lucide-react";
import { authApi } from "../../../api/authApi";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleRegister(){
        setError('');
        const user = {
            name: name,
            id: 0,
            username: email,
            email: email,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        try {
            const success = await authApi.register(user);
            if(success){
                navigate('/login');
            }
        } catch(error) {
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
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <h1 className={UI.title}>Create Account</h1>
                    <p className={UI.subtitle}>Join us and get started today</p>
                </div>
                
                <div className="space-y-4">
                    <div className={UI.inputWrapper}>
                        <label htmlFor="name" className={UI.label}>Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input 
                                className={`${UI.input} pl-10`} 
                                type="text" 
                                placeholder="John Doe" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    
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
                        <button onClick={handleRegister} className={UI.buttonPrimary}>
                            Register
                            <UserPlus className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
                
                <div className={UI.divider}>
                    <span className={UI.dividerText}>or</span>
                </div>
                
                <button onClick={() => navigate('/login')} className={UI.buttonSecondary}>
                    <LogIn className="w-4 h-4" />
                    Already have an account? Sign In
                </button>
            </div>
        </div>
    );
}
