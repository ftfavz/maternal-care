import React, { useState } from "react";
import "./Login.css";
import { Col, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import google from "../../Images/google2.png";
import { useLocation, useNavigate } from "react-router-dom";
import { serviceProviderLogin } from "../../Services/allAPI";
import { toast } from "react-toastify";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
    const fetchData = async () => {
      if (role === "provider") {
        const result = await serviceProviderLogin(loginDetails);
        if (result.status === 200) {
          localStorage.setItem("maternity-token", result?.data?.token);
          localStorage.setItem("maternity-role", "provider");
          toast.success("Login Successful");
          navigate("/care-provider-dashboard");
        }
      }
    };
    fetchData();
  };
  return (
    <>
      <Row>
        <div
          className="login_page d-flex justify-content-center align-items-center"
          style={{ width: "100%", minHeight: "100vh" }}
        >
          <Row className="my-5">
            <Col lg={1} className="p-0"></Col>
            <Col
              lg={10}
              className="mt-5 d-flex justify-content-center align-items-center p-0"
            >
              <div
                className="shadow rounded login_body"
                style={{
                  width: "75%",
                  backgroundColor: "white",
                  padding: "20px",
                }}
              >
                <Row>
                  <Col
                    lg={6}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <h2
                      className="righteous-regular"
                      style={{ color: "white", textAlign: "center" }}
                    >
                      {role === "admin" ? (
                        <>
                          WELCOME
                          <br />
                          ADMIN
                        </>
                      ) : role === "provider" ? (
                        <>
                          WELCOME
                          <br />
                          SERVICE PROVIDER
                        </>
                      ) : (
                        <>
                          HELLO
                          <br />
                          WELCOME!
                        </>
                      )}
                    </h2>
                    <img
                      src="https://media.istockphoto.com/id/1341609914/vector/pregnant-couple-background-vector-illustration-with-a-husband-takes-care-and-hugs-his-wife.jpg?s=612x612&w=0&k=20&c=IZ7k7IktzY_x61KybAj2yBioHTLk6r86jafhB3ExN0E="
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        margin: "10px 0",
                      }}
                      alt="getstarted"
                    />
                    <p
                      className="mt-2 text-justify"
                      style={{
                        color: "white",
                        textAlign: "justify",
                      }}
                    >
                      {" "}
                      We are dedicated to providing comprehensive and
                      compassionate care for mothers-to-be and their families.
                      Our platform is designed to ensure seamless communication
                      and support throughout your maternity journey.
                    </p>
                  </Col>

                  <Col lg={6} className="my-4">
                    <div
                      className="rounded h-100 d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "white", padding: "20px" }}
                    >
                      <div className="w-100">
                        <h4
                          style={{
                            color: "rgb(39, 103, 141)",
                            textAlign: "center",
                          }}
                        >
                          Login Your Account
                        </h4>
                        <div className="d-flex justify-content-center align-items-center mt-2">
                          <TextField
                            className="w-75 mt-2"
                            id="standard-basic"
                            type="email"
                            label="Email"
                            variant="standard"
                            onChange={(e) =>
                              setLoginDetails({
                                ...loginDetails,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <TextField
                            className="w-75 mt-2"
                            id="standard-basic2"
                            type="password"
                            label="Password"
                            variant="standard"
                            onChange={(e) =>
                              setLoginDetails({
                                ...loginDetails,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="d-flex justify-content-center  gap-3 flex-wrap mt-3 ">
                          <div className="">
                            <input
                              className="me-2"
                              style={{ width: "20px", height: "20px" }}
                              type="checkbox"
                            />

                            <label htmlFor="remember" className="">
                              Remember?
                            </label>
                          </div>
                          <a href="/forgot-password" className="">
                            Forgot password?
                          </a>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">

                          <button
                            className="btn btn-primary login_button rounded w-75 mt-4"
                            onClick={handleSubmit}
                          >

                            Login
                          </button>
                        </div>
                        <div
                          className={`d-flex justify-content-center align-items-center mt-3 ${
                            role === "admin" ? "d-none" : ""
                          }`}
                        >
                          <p>or connect with google</p>
                        </div>
                        <div
                          className={`d-flex justify-content-center align-items-center ${
                            role === "admin" ? "d-none" : ""
                          }`}
                        >
                          <button className="btn btn-primary rounded w-75">
                            <img
                              className="me-2"
                              src={google}
                              style={{ width: "25px", height: "25px" }}
                              alt="google"
                            />
                            Sign in with Google
                          </button>
                        </div>
                        <div className="d-flex justify-content-center gap-4 flex-wrap mt-3">
                          {role === "admin" ? (
                            <a href="/login">Login as User</a>
                          ) : (
                            <a href="/login?role=admin">Login as Admin</a>
                          )}
                          {role === "provider" ? (
                            <a href="/login">Login as User</a>
                          ) : (
                            <a href="/login?role=provider">
                              Login as Service Provider
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={1} className="p-0"></Col>
          </Row>
        </div>
      </Row>
    </>
  );
}

export default Login;
