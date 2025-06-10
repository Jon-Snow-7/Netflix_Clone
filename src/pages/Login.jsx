import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid login");

      const data = await res.json();
      console.log(data);
      localStorage.setItem("token", data.token);
    
        navigate("/profiles");
     
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <main className="bg-black text-white w-[500px] p-10 rounded-lg shadow-lg">
        <section>
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label htmlFor="email">E-mail</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 text-white"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail Address"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 text-white"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-black py-2 rounded"
            >
              Login
            </button>
          </form>

          <p className="mt-4">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Register
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;
