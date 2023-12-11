import React, { useState, FormEvent } from 'react';
import "../App.css"

interface SignInFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const SignInForm = ({ open, setOpen }: SignInFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ action: 'signin', value: { email, password } }, response => {
                    if (response.error) {
                        reject(response.error);
                    } else {
                        // Handle successful sign-in, if needed
                        resolve(response);
                    }
                });
            });
            // Additional actions after successful sign-in, if any
        } catch (error) {
            setError(typeof error === 'string' ? error : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignIn} className="signin-form">
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signin-input" // Add class name here
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signin-input" // Add class name here
                />
            </div>
            <button type="submit" disabled={loading} className="signin-button">
                Sign In
            </button>
            {error && <p className="signin-error">{error}</p>}
        </form>
    );
};

export default SignInForm;
