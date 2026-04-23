"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        const data = await res.json();
        setError(data.error || "Error de autenticación");
      }
    } catch (err) {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-[#151030] p-8 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-black text-white text-center mb-8">
          Acceso <span className="text-[#915eff]">Seguro</span>
        </h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-white font-medium">Contraseña Maestra</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="bg-[#100d25] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#915eff] transition-all text-white placeholder-neutral-500"
              required
            />
          </label>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-[#915eff] hover:bg-[#7d4dd6] text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? "Verificando..." : "Entrar al Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
