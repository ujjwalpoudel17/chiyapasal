import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                setLoading(false);
                return;
            }

            // save token
            localStorage.setItem("token", data.token);

            // save user
            localStorage.setItem("user", JSON.stringify(data.user));

            // send user to parent component
            if (data.user.role === "admin") {
                navigate("/admin");
            }

            if (data.user.role === "waiter") {
                navigate("/waiter");
            }

            if (data.user.role === "reception") {
                navigate("/reception");
            }

        } catch (err) {
            setError("Server connection failed");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4">
                        <span className="text-2xl font-bold">CP</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">ChiyaPasal</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Please enter your staff credentials
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>

                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            placeholder="waiter@chiya.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-amber-200"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        Forgot password? Contact your Admin.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;