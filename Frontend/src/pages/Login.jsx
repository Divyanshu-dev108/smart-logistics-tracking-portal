import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Smart Logistics
        </h1>

        <input
          className="w-full border p-2 rounded mb-4"
          type="email"
          placeholder="Email"
        />

        <input
          className="w-full border p-2 rounded mb-4"
          type="password"
          placeholder="Password"
        />

        <Link
          to="/dashboard"
          className="block text-center bg-blue-600 text-white py-2 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Login;