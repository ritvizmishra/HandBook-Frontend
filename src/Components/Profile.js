import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callProfilePage = async () => {
    try {
      const res = await fetch("/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserData(data);
      console.log(userData);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callProfilePage();
    document.body.style.background = "#f8f9fe";
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const getData = () => {
    let list3 = localStorage.getItem("list3");
    if (list3) {
      return JSON.parse(list3);
    } else {
      return [];
    }
  };

  const [isActive, setActive] = useState(true);
  const [user, setUser] = useState(getData());
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = (e) => {
    e.preventDefault();
    console.log(user);
    toast.success("Profile Updated !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toast-login",
    });
    setActive(true);
  };

  const editProfile = () => {
    setActive(false);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  };

  useEffect(() => {
    localStorage.setItem("list3", JSON.stringify(user));
  }, [user]);
  return (
    <section id="profile" style={{ background: "#f8f9fe" }}>
      <ToastContainer />
      {loading ? (
        <div
          className="align-items-center justify-content-center d-flex"
          style={{
            height: "100vh",
          }}
        >
          <div
            className="align-items-center justify-content-center d-flex"
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              boxShadow: "rgb(0 0 0 / 23%) 0px 0.5px 3px 1px",
            }}
          >
            <div id="Profilespinner" className="text-center"></div>
          </div>
        </div>
      ) : (
        <div className="contentBg position-relative" style={{ height: "70vh" }}>
          <div
            className="pl-5 position-absolute w-100 text-white"
            style={{
              height: "100%",
              background: "rgb(0 12 21 / 71%)",
              textShadow: "rgb(0 0 0 /40%) 1px 1px 2px",
            }}
          >
            <div
              className="d-flex justify-content-end mt-4 mx-3"
              style={{ fontWeight: "600" }}
            >
              <div className="position-absolute" style={{ left: "65px" }}>
                USER PROFILE
              </div>
              <NavLink to="/" className="text-decoration-none text-white">
                {" "}
                <div className="justify-content-end d-flex mr-4 pr-4">
                  <span
                    className="fa fa-sign-out align-items-center d-flex mr-2"
                    style={{ transform: "rotate(180deg)" }}
                  ></span>
                  Back
                </div>
              </NavLink>
            </div>
            <div
              className="ml-3 align-items-center d-flex"
              style={{
                fontSize: "48px",
                fontFamily: "cursive",
                height: "100%",
              }}
            >
              <div>
                <div>
                  Hello ! {userData.fname} {userData.lname}
                </div>
                <div className="w-50 mt-2" style={{ fontSize: "18px" }}>
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                </div>
              </div>
            </div>
          </div>
          <div className="content position-relative" style={{ top: "80%" }}>
            <div className="row mx-5">
              <div className="col-lg-8 mb-5 col-12 pr-2">
                <div
                  className=""
                  style={{
                    minHeight: "50vh",
                    borderRadius: "15px",
                    background: "#f8f9fe",
                    boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
                    border: "1px solid rgba(0, 0, 0, .05)",
                  }}
                >
                  <div className="mb-4">
                    <form method="GET" onSubmit={PostData}>
                      <div
                        className="d-flex align-items-center py-4 px-4 bg-white"
                        style={{
                          borderRadius: "15px 15px 0px 0px",
                          fontWeight: "500",
                          fontSize: "18px",
                        }}
                      >
                        <div className="">My Account</div>
                        {isActive ? (
                          <div
                            className="btn btn-primary ml-auto border-0"
                            style={{ height: "fit-content" }}
                            onClick={editProfile}
                          >
                            Edit Profile
                          </div>
                        ) : (
                          <div
                            className="btn btn-primary ml-auto px-4 border-0"
                            style={{ height: "fit-content" }}
                          >
                            <button
                              id="button"
                              type="submit"
                              className="bg-transparent border-0 text-white"
                            >
                              Save
                            </button>
                          </div>
                        )}
                      </div>

                      {isActive ? (
                        <div>
                          <div>
                            {" "}
                            <div
                              className="mt-4 px-4"
                              style={{
                                fontWeight: "500",
                                fontSize: "14px",
                                color: "#8898aa",
                              }}
                            >
                              USER INFORMATION
                            </div>
                            <div
                              key={userData._id}
                              className="px-5 pt-3"
                              style={{ color: "#525f7f", fontWeight: "600" }}
                            >
                              <div className="d-flex mt-3">
                                <div>First Name:</div>
                                <div className="ml-auto">{userData.fname}</div>
                              </div>
                              <div className="d-flex mt-3">
                                <div>Last Name:</div>
                                <div className="ml-auto">{userData.lname}</div>
                              </div>
                              <div className="d-flex mt-3">
                                <div>Email:</div>
                                <div className="ml-auto">{userData.email}</div>
                              </div>
                              <div className="d-flex mt-3">
                                <div>Mobile:</div>
                                <div className="ml-auto">{userData.mobile}</div>
                              </div>
                            </div>
                          </div>
                          <hr className="m-4" style={{ color: "white" }}></hr>
                          <div>
                            {" "}
                            <div
                              className="px-4"
                              style={{
                                fontWeight: "500",
                                fontSize: "14px",
                                color: "#8898aa",
                              }}
                            >
                              CONTACT INFORMATION
                            </div>
                            <div
                              className="px-5 pt-3"
                              style={{ color: "#525f7f", fontWeight: "600" }}
                            >
                              <div className="d-flex mt-3">
                                <div>Address:</div>
                                <div className="ml-auto text-right">
                                  {user.address || "- not added -"}
                                </div>
                              </div>
                              <div className="d-flex mt-3">
                                <div>City:</div>
                                <div className="ml-auto">
                                  {user.city || "- not added -"}
                                </div>
                              </div>
                              <div className="d-flex mt-3">
                                <div>Country:</div>
                                <div className="ml-auto">
                                  {user.country || "- not added -"}
                                </div>
                              </div>
                              <div className="d-flex mt-3">
                                <div>Postal Code:</div>
                                <div className="ml-auto">
                                  {user.postal || "- not added -"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="m-4" style={{ color: "white" }}></hr>
                          <div>
                            <div
                              className="px-4"
                              style={{
                                fontWeight: "500",
                                fontSize: "14px",
                                color: "#8898aa",
                              }}
                            >
                              ABOUT ME
                            </div>
                            <div
                              className="px-5 pt-3"
                              style={{ color: "#525f7f", fontWeight: "600" }}
                            >
                              <div>About Me:</div>
                              <div className="ml-auto mt-3">
                                {user.aboutMe || "- not added -"}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {spinner ? (
                            <div
                              className="align-items-center justify-content-center d-flex"
                              style={{
                                height: "100vh",
                              }}
                            >
                              <div
                                className="align-items-center justify-content-center d-flex"
                                style={{
                                  borderRadius: "50%",
                                  width: "40px",
                                  height: "40px",
                                  boxShadow:
                                    "rgb(0 0 0 / 23%) 0px 0.5px 3px 1px",
                                }}
                              >
                                <div
                                  id="Profilespinner"
                                  className="text-center"
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div>
                                <div
                                  className="mt-4 px-4"
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    color: "#8898aa",
                                  }}
                                >
                                  USER INFORMATION
                                </div>
                                <div
                                  className="px-5 py-3 row"
                                  style={{
                                    color: "#525f7f",
                                    fontWeight: "600",
                                  }}
                                >
                                  <div className="col-6 my-3">
                                    <div>First Name:</div>
                                    <input
                                      type="text"
                                      className="form-control border-0 mt-2"
                                      name="fname"
                                      value={userData.fname || user.name}
                                      onChange={handleInputs}
                                      style={{
                                        boxShadow:
                                          "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                        height: "45px",
                                      }}
                                      placeholder="Enter FirstName"
                                    />
                                  </div>
                                  <div className="col-6 my-3">
                                    <div>Last Name:</div>
                                    <input
                                      type="text"
                                      className="form-control border-0 mt-2"
                                      name="lname"
                                      value={userData.lname || user.lname}
                                      onChange={handleInputs}
                                      style={{
                                        boxShadow:
                                          "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                        height: "45px",
                                      }}
                                      placeholder="Enter LastName"
                                    />
                                  </div>
                                  <div className="col-6 my-3">
                                    <div>Email:</div>
                                    <input
                                      type="email"
                                      className="form-control border-0 mt-2"
                                      name="email"
                                      value={userData.email || user.email}
                                      onChange={handleInputs}
                                      style={{
                                        boxShadow:
                                          "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                        height: "45px",
                                      }}
                                      placeholder="Enter Email"
                                    />
                                  </div>
                                  <div className="col-6 my-3">
                                    <div>Mobile:</div>
                                    <input
                                      type="tel"
                                      className="form-control border-0 mt-2"
                                      name="mobile"
                                      value={userData.mobile || user.mobile}
                                      onChange={handleInputs}
                                      style={{
                                        boxShadow:
                                          "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                        height: "45px",
                                      }}
                                      placeholder="Enter Mobile"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr
                                className="m-4"
                                style={{ color: "rgb(0,0,0,0.2)" }}
                              ></hr>
                              <div>
                                {" "}
                                <div
                                  className="px-4 pt-2"
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    color: "#8898aa",
                                  }}
                                >
                                  CONTACT INFORMATION
                                </div>
                                <div
                                  className="px-5 py-3 row"
                                  style={{
                                    color: "#525f7f",
                                    fontWeight: "600",
                                  }}
                                >
                                  <div className="col-12 my-3">
                                    <div>Address:</div>
                                    <input
                                      type="text"
                                      className="form-control border-0 mt-2"
                                      name="address"
                                      value={user.address}
                                      onChange={handleInputs}
                                      style={{
                                        boxShadow:
                                          "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                        height: "45px",
                                      }}
                                      placeholder="Address"
                                    />
                                  </div>
                                  <div className="col-4 my-3">
                                    <div>City:</div>
                                    <input
                                      type="text"
                                      className="form-control border-0 mt-2"
                                      name="city"
                                      value={user.city}
                                      onChange={handleInputs}
                                      style={{
                                        boxShadow:
                                          "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                        height: "45px",
                                      }}
                                      placeholder="City"
                                    />
                                  </div>
                                  <div className="col-4 my-3">
                                    <div>Country:</div>
                                    <input
                                      type="text"
                                      className="form-control border-0 mt-2"
                                      name="country"
                                      value={user.country}
                                      onChange={handleInputs}
                                      style={{
                                        boxShadow:
                                          "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                        height: "45px",
                                      }}
                                      placeholder="Country"
                                    />
                                  </div>
                                  <div className="col-4 my-3">
                                    <div>Postal Code:</div>
                                    <input
                                      type="tel"
                                      className="form-control border-0 mt-2"
                                      name="postal"
                                      value={user.postal}
                                      onChange={handleInputs}
                                      style={{
                                        boxShadow:
                                          "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                        height: "45px",
                                      }}
                                      placeholder="Postal Code"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr
                                className="m-4"
                                style={{ color: "rgb(0,0,0,0.2)" }}
                              ></hr>
                              <div>
                                <div
                                  className="px-4 mb-2"
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    color: "#8898aa",
                                  }}
                                >
                                  ABOUT ME
                                </div>
                                <div
                                  className="px-5 pt-4"
                                  style={{
                                    color: "#525f7f",
                                    fontWeight: "600",
                                  }}
                                >
                                  <div>About Me:</div>
                                  <textarea
                                    name="aboutMe"
                                    value={user.aboutMe}
                                    onChange={handleInputs}
                                    rows={4}
                                    className="form-control border-0 mt-2"
                                    style={{
                                      boxShadow:
                                        "0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)",
                                    }}
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-12 pl-2 mt-lg-0 mt-4">
                <div
                  className="p-3 position-relative justify-content-center bg-white d-flex"
                  style={{
                    minHeight: "50vh",
                    borderRadius: "15px",
                    boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
                  }}
                >
                  <div
                    className="fa text-dark fa-user-circle position-absolute"
                    style={{
                      top: "-108px",
                      fontSize: "13rem",
                      boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div className="position-relative text-center mt-5 pt-3">
                    <div
                      className="mt-5"
                      style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#32325d",
                      }}
                    >
                      {userData.fname || ""} {userData.lname || ""}
                    </div>
                    <div
                      className="my-2"
                      style={{
                        color: "#32325d",
                        fontWeight: "400",
                        fontSize: "12px",
                      }}
                    >
                      {user.city || "B.tech"}, {user.country || "CSE"}
                    </div>
                    <div
                      className="mt-4"
                      style={{ color: "#32325d", fontWeight: "600" }}
                    >
                      Minor Project - HandBook
                    </div>
                    <div className="my-2" style={{ color: "#525F7F" }}>
                      Gautam Buddha University
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
