import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { forgotPassword, login } from "../../actions";
import Input from "../../components/UI/Input";
function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState("login");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  const userLogin = (e) => {
    e.preventDefault();
    if (form === "login") {
      const user = { email, password };
      dispatch(login(user));
    } else {
      dispatch(forgotPassword({ email }));
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form onSubmit={userLogin} className="w-25">
        {form === "login" && (
          <>
            {auth.error && <p className="errorMessage">{auth.error}</p>}
            <Input
              label="Email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => {
                setEmail("");
                setPassword("");
                setForm("forgotPassword");
              }}
              style={{ textAlign: "right", cursor: "pointer" }}
            >
              Forgot Password?
            </div>
          </>
        )}
        {form === "forgotPassword" && (
          <>
            {auth.forgotPasswordError && (
              <p className="errorMessage">{auth.forgotPasswordError}</p>
            )}

            <Input
              label="Email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div
              onClick={() => {
                setEmail("");
                setPassword("");
                setForm("login");
              }}
              style={{ textAlign: "right", cursor: "pointer" }}
            >
              Back to Sign In
            </div>
          </>
        )}
        {/* isForgotPassword */}
        <Button
          disabled={auth.isForgotPassword || auth.authenticating}
          variant="primary"
          type="submit"
        >
          {(auth.isForgotPassword || auth.authenticating) && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}{" "}
          Submit
        </Button>
      </Form>
    </div>
  );
}

Signin.propTypes = {};

export default Signin;
