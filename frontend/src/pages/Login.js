import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://demo.backend.me/contribute/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      window.sessionStorage.setItem("user", JSON.stringify(response.data));
      // window.location.reload(true);
      navigate("/contribute");
    } catch (error) {
      console.log(error);
      swal("Login Failed", "Check email or password!", "error");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <div className="col-6">
        <form>
          <div className="mb-4">
            <h6>Email address</h6>
            <input
              type="email"
              id="form1Example1"
              className="form-control"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <h6>Password</h6>
            <input
              type="password"
              id="form1Example2"
              className="form-control"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleLogin}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
