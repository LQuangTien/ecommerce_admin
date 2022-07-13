import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions";
function ChangePassword(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = (data) => {
    dispatch(changePassword({ ...data, email: auth.user.email }));
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form onSubmit={handleSubmit(handleSignup)} className="w-50">
        <Form.Label className="form__title d-block">Password:</Form.Label>
        <Form.Control
          className="form__input w-100"
          {...register(`password`, { required: true })}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <span className="errorMessage">This field is required</span>
        )}
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
