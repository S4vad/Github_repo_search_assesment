import React from "react";
import axios from "axios";
import { loginSchema } from "../schemas/user";
import { useNavigate, Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const formattedErrors = validation.error.errors.map((e) => e.message);
      setErrors(formattedErrors);
      return;
    }
    setErrors([]);
    try {
      const res = await axios.post("/auth/login", formData);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error: any) {
      setErrors([error.response?.data?.message || "Invalid email or password."]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-2">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        </div>
        {errors.length > 0 && (
          <ul className="text-red-500 text-sm">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;