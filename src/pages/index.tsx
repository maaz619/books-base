import React from "react";
import Home from "../components/Home";
import { AuthProvider } from "../Contexts/AuthContext";

const IndexPage = () => {
  return (
    <AuthProvider>
      <>
        <Home />
      </>
    </AuthProvider>
  );
};

export default IndexPage;
