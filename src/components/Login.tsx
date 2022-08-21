import React from "react";

const Login: React.FC = (): JSX.Element => {
  return (
    <div>
      <form action="">
        <label htmlFor="email">Email</label>
        <input className=" bg-purple-400" type="email" />
        <label htmlFor="password">Password</label>
        <input type="password" />
      </form>
    </div>
  );
};

export default Login;
