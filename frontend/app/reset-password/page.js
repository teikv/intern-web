"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-96 p-8 bg-gray-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">Đặt lại mật khẩu</h2>
        {message && <p className="text-red-500 mb-2">{message}</p>}
        <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black placeholder-gray-500"
          placeholder="Nhập mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}
