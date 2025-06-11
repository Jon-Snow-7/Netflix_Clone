import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passwordHash: '',
  });

  const [successPopup, setSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailError(""); // Reset email error on change
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setEmailError("");
  setFormError("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setEmailError("Please enter a valid email address.");
    return;
  }

  const newUser = {
    ...formData,
    active: 1,
  };

  try {
    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const result = await response.text();

    if (!response.ok) {
      console.error("Registration error:", result);
      throw new Error(result || 'Failed to register');
    }

    setSuccessMessage("Registered Successfully!");
      setSuccessPopup(true);

      setTimeout(() => {
        setSuccessPopup(false);
        navigate('/');
      }, 2500);
  } catch (error) {
    console.error('Error during registration:', error);
    setFormError(error.message || 'Registration failed');
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {successPopup && (
  <div className="absolute top-10 w-full flex justify-center z-110">
    <div className="bg-black border-2 border-blue-500 text-white px-5 py-4 rounded-xl shadow-lg w-[90%] max-w-md relative">
      <p className="text-sm font-medium text-center text-white mb-1">
        {successMessage}
      </p>
      <p className="text-xs text-center text-blue-300">
        Redirecting to login page...
      </p>
      <div className="h-1 bg-blue-500 rounded mt-3 overflow-hidden">
        <div className="h-full bg-white animate-deplete"></div>
      </div>
    </div>
  </div>
)}


      <form
        onSubmit={handleSubmit}
        className="bg-black text-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {emailError && (
            <p className="text-red-400 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 rounded-xl transition"
        >
          Sign up
        </button>
        {formError && (
          <p className="text-red-400 text-sm mt-4 text-center">{formError}</p>
        )}
        <p className="mt-4">
          Already have an account?{' '}
          <a
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
