import { Login } from "@/types/auth";
import React, { useState } from "react";

interface LoginFormProps {
  onLogin: ({ username, password }: Login) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin({ username, password });
    } catch (error) {
      console.error("Login error:", error);
      alert(error);
      setPassword("");
      //setUsername("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="px-4 py-2 border rounded bg-gray-800 text-gray-200 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 cursor-not-allowed"
        disabled
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="px-4 py-2 border rounded bg-gray-800 text-gray-200 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Submit"}
      </button>
    </form>
  );
};

export default LoginForm;
