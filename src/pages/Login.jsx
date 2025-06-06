import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <main className="bg-black text-white w-[500px] p-10 rounded-lg shadow-lg">
        <section>
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email">E-mail</label>
              <input
                className="border border-gray-300 rounded px-2 py-1 text-black"
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
                className="border border-gray-300 rounded px-2 py-1 text-black"
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
              onClick={(e) => {
                e.preventDefault();
                // Handle login logic here
                navigate("/home"); // Redirect to MySpace after login
              }}
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
