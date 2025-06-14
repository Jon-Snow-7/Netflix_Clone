import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaKey, setCaptchaKey] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCaptcha, setErrorCaptcha] = useState("");

  const fetchCaptcha = async () => {
    const res = await fetch("http://localhost:8080/captcha/generate");
    const data = await res.json();
    setCaptchaImage(data.image);
    setCaptchaKey(data.key);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrorEmail("");
    setErrorPassword("");
    setErrorCaptcha("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail("Please enter a valid email address.");
      return;
    }

    // Validate CAPTCHA
    const captchaRes = await fetch("http://localhost:8080/captcha/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: captchaKey, input: captchaInput }),
    });

    const captchaData = await captchaRes.json();
    if (!captchaData.valid) {
      setErrorCaptcha("Invalid CAPTCHA! Please try again.");
      fetchCaptcha(); // regenerate CAPTCHA
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid login");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/profiles");
    } catch (err) {
      // Basic error separation
      if (!email) setErrorEmail("Email is required!");
      if (!password) setErrorPassword("Password is required!");
      else setErrorPassword("Login failed: Invalid Email/Password!");
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
                type="text"
                name="email"
                id="email"
                placeholder="E-mail Address"
                required
              />
              {errorEmail && (
                <span className="text-sm text-red-500 mt-1">{errorEmail}</span>
              )}
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
              {errorPassword && (
                <span className="text-sm text-red-500 mt-1">
                  {errorPassword}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="captcha">Enter the text shown below</label>
              <img
                src={captchaImage}
                alt="Captcha"
                className="w-full h-16 object-contain bg-white my-2 rounded"
              />
              <input
                className="border border-gray-300 rounded px-2 py-1 text-white"
                type="text"
                name="captcha"
                id="captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter Captcha"
                required
              />
              {errorCaptcha && (
                <span className="text-sm text-red-500 mt-1">
                  {errorCaptcha}
                </span>
              )}
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
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;
