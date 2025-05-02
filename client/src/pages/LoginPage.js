import React from "react";
import AuthForm from "../components/AuthForm";
import API from "../api";
import { saveToken } from "../utils";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  console.log("----------------");

  const login = async (form) => {
    try {
      const res = await API.post("/auth/login", form);
      saveToken(res.data.token);
      // After login:
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return <AuthForm onSubmit={login} type="login" />;
};

export default LoginPage;
