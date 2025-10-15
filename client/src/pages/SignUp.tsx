import React from "react";
import { signupSchema } from "../schemas/user";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = signupSchema.safeParse(formData);
    if (!validation.success) {
      const formattedErrors = validation.error.errors.map((e) => e.message);
      setErrors(formattedErrors);
      return;
    }
    setErrors([]);
    try {
      const res = await axios.post("/auth/signup", formData);
      if (res.status === 201) navigate("/");
    } catch (error: any) {
      setErrors([error.response?.data?.message || "Signup failed. Try again."]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-2">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Name:</label>
          <input
            className="border px-3 py-2 rounded"
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email:</label>
          <input
            className="border px-3 py-2 rounded"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password:</label>
          <input
            className="border px-3 py-2 rounded"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
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
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
          Sign Up
        </button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;