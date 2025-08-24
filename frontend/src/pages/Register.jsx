import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
        await api.post("/auth/register", { email, password });
        alert("✅ Registered successfully! Please log in.");
        navigate("/login"); // redirect to login
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md space-y-3 w-80">
        <h2 className="text-xl font-bold text-center">
          Register
        </h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border px-2 py-1 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border px-2 py-1 w-full"
        />
        <button onClick={handleSubmit} className={"bg-green-500 text-white px-4 py-1 w-full"}>Register</button>
      </div>
    </div>
  );
}
