import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { appUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const [credentials, setCrendentials] = useState({
    email: "",
    password: "",
  });

  const addToken = useStoreActions((actions: any) => actions.addToken);
  const addAdmin = useStoreActions((actions: any) => actions.changeAdmin);


  async function loginHandler() {
    try {
      var formdata = new FormData();
      formdata.append("username", credentials.email);
      formdata.append("password", credentials.password);

      var requestOptions: any = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      setLoading(true);

      const response = await fetch(`${appUrl}/auth/login/`, requestOptions);
      setLoading(false);
      const result = await response.json();

      if (result.detail) {
        setLoginErr(true);
      } else {
        addToken(result.access)
        addAdmin(true?result.is_admin===true:false)
        
        navigate("/dashboard");
      }

      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrendentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        {loginErr && (
          <p className="text-red-700 py-8">Invalid email or password</p>
        )}
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="flex items-center border-border-gray-300 pb-3 mt-8 mb-2">
          <FaUser className="text-gray-400 mr-3" />
          <input
            onChange={handleChange}
            type="email"
            className="w-full border-none focus:outline-none"
            placeholder="Email"
            name="email"
            value={credentials.email}
            required
          />
        </div>

        <div className="flex items-center border-b border-gray-300 mt-4 py-3">
          <FaLock className="text-gray-400 mr-3" />
          <input
            onChange={handleChange}
            type="password"
            className="w-full border-none focus:outline-none"
            placeholder="Password"
            name="password"
            value={credentials.password}
            required
          />
        </div>

        <button
          onClick={loginHandler}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg mt-6"
        >
          {!loading ? "Sign In" : "..."}
        </button>
      </div>
    </div>
  );
}

export default Login;
