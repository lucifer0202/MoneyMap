import React from "react";
import AuthForm from "../components/AuthForm";
import API from "../api";
import { saveToken } from "../utils";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const register = async (form) => {
    try {
      const res = await API.post("/auth/register", form);
      saveToken(res.data.token);
      // After login:
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return <AuthForm onSubmit={register} type="register" />;
};

export default RegisterPage;
