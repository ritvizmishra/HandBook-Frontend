import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import ImageUpload from "../Images/image.png";
import Audio from "../Images/audio.png";
import Doc from "../Images/document.png";
import Email from "../Images/emails.png";
import { Line, Doughnut } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";
import axios from "axios";
import { Data } from "../Data/Data";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { NavLink, useHistory } from "react-router-dom";

const getEditor = () => {
  let list1 = localStorage.getItem("list1");
  if (list1) {
    return JSON.parse(list1);
  } else {
    return [];
  }
};
const getImages = () => {
  let list2 = localStorage.getItem("list2");
  if (list2) {
    return JSON.parse(list2);
  } else {
    return [];
  }
};
const getDoc = () => {
  let list4 = localStorage.getItem("list4");
  if (list4) {
    return JSON.parse(list4);
  } else {
    return [];
  }
};

const getTransactions = () => {
  let list5 = localStorage.getItem("list5");
  if (list5) {
    return JSON.parse(list5);
  } else {
    return [];
  }
};

function ResponsiveDrawer() {
  const newPlugin = defaultLayoutPlugin();
  useEffect(() => {
    document.body.style.background = "black";
    callProfilePage();
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 1000);
  }, []);
  const history = useHistory();
  const [drawerWidth, setdrawerWidth] = useState(266);
  const [isExpanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navbar, setNavbar] = useState(true);
  const [isActive, setActive] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeNavbar = () => {
    if (window.scrollY > 250) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };
  window.addEventListener("scroll", changeNavbar);

  const [date1, setDate1] = useState();
  setInterval(() => {
    setDate1(refreshDate(new Date()));
  }, 1000);

  const refreshDate = (date) => {
    return date.toLocaleString([], {
      weekday: "long",
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const closeEditor = () => {
    setdrawerWidth(266);
    document.body.style.background = "black";
    var a = document.getElementById("navbar");
    if (a.style.display !== "block") {
      a.style.display = "block";
    }
    setActive(false);
  };
  const drawer = (
    <div>
      <Toolbar />
      <div></div>
      <Divider />
      <div className="position-relative justify-content-center align-items-center d-flex py-2">
        <div>
          <div className="text-center py-4 pb-5">
            <span className="fa fa-book fa-4x text-white text-center"></span>
            <div
              className="text-white"
              style={{ fontWeight: "700", fontSize: "25px" }}
            >
              <span style={{ color: "#5082ff" }}>Hand</span>Book
            </div>
          </div>
          <div
            className="fa fa-search text-white position-absolute"
            style={{ paddingInline: "12px", paddingTop: "13px" }}
          ></div>
          <input
            type="search"
            className="bg-dark border-0"
            placeholder="Search"
            style={{
              height: "42px",
              outline: "none",
              borderRadius: "50px",
              paddingLeft: "34px",
            }}
          />
        </div>
      </div>
      <div className="position-relative justify-content-center align-items-center d-flex px-2">
        <div className="w-100 px-3">
          <div
            className="fa fa-plus text-white position-absolute"
            style={{ paddingInline: "12px", paddingTop: "13px" }}
          ></div>
          <div
            className="fa fa-angle-down text-white position-absolute"
            style={{ paddingInline: "12px", paddingTop: "13px", left: "78%" }}
          ></div>
          <div
            className="border-0"
            style={{
              height: "42px",
              background: "#5082ff",
              outline: "none",
              borderRadius: "50px",
              paddingLeft: "34px",
            }}
          ></div>
        </div>
      </div>
      <Divider />
      <div>
        <ul
          className="nav nav-tabs list-unstyled px-3 my-5 DashTabs"
          style={{
            color: "black",
            fontWeight: "500",
            borderBottom: "none",
            fontSize: "20px",
          }}
        >
          <li className="active py-2" style={{ width: "100%" }}>
            <div
              className="active p-3 tab align-items-center text-white d-flex"
              type="button"
              data-toggle="tab"
              href="#home1"
            >
              <span className="fa fa-home" style={{ paddingRight: "20px" }} />
              Home
            </div>
          </li>
          <li className="py-2" style={{ width: "100%" }} onClick={closeEditor}>
            <div
              className="p-3 tab align-items-center d-flex text-white"
              type="button"
              data-toggle="tab"
              href="#inbox"
            >
              <span
                className="fa fa-envelope-o"
                style={{ paddingRight: "20px" }}
              />
              Compose Email
            </div>
          </li>
          <li className="py-2" style={{ width: "100%" }} onClick={closeEditor}>
            <div
              className="p-3 tab align-items-center d-flex text-white"
              type="button"
              data-toggle="tab"
              href="#dropbox"
            >
              <span
                className="fa fa-dropbox"
                style={{ paddingRight: "20px" }}
              />
              DropBox
            </div>
          </li>
          <li className="py-2" style={{ width: "100%" }} onClick={closeEditor}>
            <div
              className="p-3 tab align-items-center d-flex text-white"
              type="button"
              data-toggle="tab"
              href="#calendar"
            >
              <span
                className="fa fa-calendar"
                style={{ paddingRight: "20px" }}
              />
              Calendar
            </div>
          </li>
          <li className=" py-2" style={{ width: "100%" }} onClick={closeEditor}>
            <div
              className=" p-3 tab align-items-center d-flex text-white"
              type="button"
              data-toggle="tab"
              href="#transactions"
            >
              <span
                className="fa fa-credit-card"
                style={{ paddingRight: "20px" }}
              />
              Transactions
            </div>
          </li>
        </ul>
      </div>
      <Divider />
    </div>
  );

  // ------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------Inbox-------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  const form = useRef();
  const [mail, setMail] = useState({});
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setMail({ ...mail, [name]: value });
  };
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(mail);
    console.log(form.current);
    emailjs
      .sendForm(
        "service_bdy40vm",
        "template_dwlucdq",
        form.current,
        "lCP5fKsL73HkyO8v6"
      )
      .then(
        (res) => {
          toast.success("Message Sent !", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "toast-message",
          });
          console.log(res.text);
        },
        (err) => {
          toast.warn("Message not sent !", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "toast-message",
          });
          console.log(err.text);
        }
      );
  };

  // ------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------UserData-------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  const [userData, setUserData] = useState({
    fname: "",
    email: "",
  });

  const callProfilePage = async () => {
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
  };

  // ------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------Calendar-------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const [addEvent, setAddEvent] = useState({
    title: "",
    start: "",
    end: "",
  });
  const [allEvents, setAllEvents] = useState(Data);

  const handleEvent = () => {
    setAllEvents([...allEvents, addEvent]);
  };

  // ------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------Editor---------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  const resizeEditor = () => {
    setdrawerWidth(0);
    setExpanded(true);
  };
  const compressEditior = () => {
    setdrawerWidth(266);
    setExpanded(false);
  };

  const showEditor = () => {
    setActive(true);
    document.getElementById("navbar").style.display = "none";
    document.body.style.background = "rgb(38, 38, 38)";
  };

  const [userInfo, setuserInfo] = useState({
    title: "",
    description: "",
  });
  const onChangeValue = (e) => {
    document.getElementById("save").style.display = "block";
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  let editorState = EditorState.createEmpty();
  const [text, setText] = useState(getEditor());
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const submit = (e) => {
    e.preventDefault();
    var content = userInfo.description.value.replace(/<[^>]*>?/gm, "");
    setText([
      {
        id: new Date().getTime(),
        title: userInfo.title,
        description: content.replace(/\n/g, ""),
      },
      ...text,
    ]);
    toast.success("Saved !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toast-message",
    });
    document.body.style.background = "black";
    setActive(false);
    console.log(text);
  };
  const removeItem = (id) => {
    const updatedItems = text.filter((e) => {
      return e.id !== id;
    });
    setText(updatedItems);
    toast.success("Deleted !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toast-message",
    });
  };

  // ------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------Image Upload-------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  const [file, setFile] = useState(getImages());
  const [Image, setImage] = useState([]);
  const handleChange = (e) => {
    console.log(e.target.files);
    const selectedFiles = Array.from(e.target.files);
    const images = selectedFiles.map((e) => {
      return URL.createObjectURL(e);
    });
    setFile((prev) => prev.concat(images));
    console.log(images);
    toast.success("Image Uploaded !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toast-message",
    });
  };
  const viewImage = (item) => {
    const selectedImage = file.filter((e) => {
      if (item === e) {
        return item;
      }
    });
    setImage(selectedImage);
  };

  const removeImage = (image) => {
    setFile(file.filter((e) => e !== image));
    toast.success("Item Removed !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toast-message",
    });
  };
  // ------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------Doc Upload-------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  const [doc, setDoc] = useState(getDoc());
  const [docItem, setDocItem] = useState([]);
  const fileType = ["application/pdf"];
  const docUpload = (e) => {
    let selectedFiles = e.target.files[0];
    if (selectedFiles) {
      if (selectedFiles && fileType.includes(selectedFiles.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFiles);
        reader.onload = (e) => {
          setDoc((prev) => prev.concat(e.target.result));

          toast.success("Document Uploaded !", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "toast-message",
          });
        };
      } else {
        setDoc(null);
      }
    } else {
      console.log("select a file");
    }
  };
  useEffect(() => {
    setDocItem(doc);
  }, [doc]);
  const [open, setOpen] = useState([]);
  const viewPdf = (item) => {
    const selectedDoc = docItem.filter((e) => {
      if (item === e) {
        return item;
      }
    });
    setOpen(selectedDoc.toString());
  };
  const removeDoc = (document) => {
    setDoc(docItem.filter((e) => e !== document));
    toast.success("Item Removed !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "toast-message",
    });
  };

  // ------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------Recorder-------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.getElementById("saveAudio").appendChild(audio);
    document.getElementById("audioBg").style.display = "none";
    document.getElementById("audioBtn").style.display = "block";
  };

  useEffect(() => {
    document.getElementById("audioBg").style.display = "block";
    document.getElementById("audioBtn").style.display = "none";
  }, []);
  // ------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------Transaction------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  const [transaction, setTrasaction] = useState({
    id: new Date().getTime(),
  });
  // const [transaction, setTrasaction] = useState(getTransactions());
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get("/payments")
      .then((res) => {
        console.log(res.data.mydata);
        setDetails(res.data.mydata);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleTransaction = (e) => {
    name = e.target.name;
    value = e.target.value;

    setTrasaction({ ...transaction, [name]: value });
    // console.log(transaction);
  };

  const addItems = () => {
    setDetails([...details, transaction]);
  };
  useEffect(() => {
    console.log(details);
    success();
  }, [details]);

  const [successfull, setSuccessfull] = useState(Number);
  const [failed, setFailed] = useState(Number);
  const [pending, setPending] = useState(Number);
  const success = () => {
    const totalSuccess = details?.filter(
      (e) => e.status === "Successful"
    ).length;

    const totalFailed = details?.filter((e) => e.status === "Failed").length;

    const totalPending = details?.filter((e) => e.status === "Pending").length;

    setSuccessfull(totalSuccess);
    setFailed(totalFailed);
    setPending(totalPending);
  };
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [actualData, setActualData] = useState([]);
  const lineChart = () => {
    const output = details?.map((e) => {
      const res = new Date(e.date);
      let name = month[res.getMonth()];
      return { amount: e.amount, month: name };
    });
    setActualData(output);
  };
  useEffect(() => {
    console.log(actualData);
  }, [actualData]);
  // ------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    lineChart();
    localStorage.setItem("list1", JSON.stringify(text));
    localStorage.setItem("list2", JSON.stringify(file));
    localStorage.setItem("list4", JSON.stringify(doc));
    localStorage.setItem("list5", JSON.stringify(details));
  }, [text, file, details]);
  return (
    <div id="home">
      <ToastContainer />
      <div id="loader">
        <div
          className="justify-content-center align-items-center d-flex"
          style={{ height: "100vh" }}
        >
          <div id="spinner" className="text-center"></div>
          <span
            className="fa fa-book fa-4x position-absolute"
            style={{ color: "#5082ff" }}
          ></span>
        </div>
      </div>
      <div id="content" style={{ display: "none" }} className="animate-bottom">
        {navbar ? (
          <div className="" id="navbar" style={{ transition: "0.5s" }}>
            <AppBar
              className="p-2"
              sx={{
                zIndex: 1,
                background: "transparent",
                boxShadow: "none",
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <div
                className="d-lg-flex align-items-center text-lg-block text-center p-4 mt-lg-0 mt-md-0 mt-5"
                style={{
                  textShadow: "1px 1px 2px rgb(0 0 0 / 40%)",
                }}
              >
                <div className=" mb-lg-0 mb-3" style={{ fontSize: "25px" }}>
                  Good{" "}
                  {new Date().setHours(12, 0, 0, 0) < new Date().getTime()
                    ? "Afternoon"
                    : "Morning"}
                  , {userData.fname} !
                </div>
                <div
                  className="px-lg-5 px-md-5 px-3 mb-lg-0 mb-2"
                  id="dateandtime"
                  style={{ marginLeft: "auto", fontSize: "17px" }}
                >
                  {date1}
                </div>
                <div
                  className="px-2 navbar-nav"
                  id="loginProfileIcon"
                  style={{ width: "fit-content" }}
                >
                  <div className="text-center position-relative justify-content-center d-flex nav-item align-items-center d-lg-flex">
                    <NavLink to="">
                      <div className="btn btn-dark">
                        <span className="fa fa-user-circle mr-2"></span>
                        &nbsp;{userData.fname || "Profile"}
                      </div>
                    </NavLink>
                    <div className="dropdown-menu bg-transparent py-3 rounded-0 text-white border-0 position-absolute">
                      <div
                        className="p-3"
                        style={{
                          width: "15vw",
                          boxShadow: "0 1px 10px rgb(0 0 0 / 8%)",
                          background: "rgb(26,26,26)",
                        }}
                      >
                        <ul
                          className="list-unstyled text-white m-0"
                          style={{ fontSize: "14px" }}
                        >
                          {console.log(userData.fname)}
                          {userData.fname !== "" ? (
                            <NavLink
                              to="/profile"
                              className="text-decoration-none text-white"
                            >
                              <div style={{ bottom: "1px solid #8080804d" }}>
                                <div className="" style={{ fontWeight: "600" }}>
                                  Hello! {userData.fname}
                                </div>
                                <div
                                  className="mb-1"
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                  }}
                                >
                                  {userData.email}
                                </div>
                              </div>
                            </NavLink>
                          ) : (
                            <div style={{ color: "white" }}>
                              <div style={{ fontWeight: "600" }}>Welcome</div>
                              <div>to access account</div>
                              <NavLink to="/login">
                                <div
                                  className="btn btn-danger mt-3 mb-2 bg-transparent loginBtn"
                                  style={{
                                    color: "#5082ff",
                                    transition: "0.5s",
                                    fontWeight: "600",
                                    border: "1px solid #5082ff",
                                    fontSize: "14px",
                                  }}
                                >
                                  LOGIN / SIGNUP
                                </div>
                              </NavLink>
                            </div>
                          )}
                          <hr style={{ color: "#A9ABB3" }}></hr>
                          <li style={{ marginTop: "12px" }}>Home</li>
                          <li>Compose Email</li>
                          <li>DropBox</li>
                          <li>Calendar</li>
                          <li>Transaction</li>
                          <li onClick={showEditor}>
                            Text Editor
                            <span
                              className="bg-primary rounded-pill text-white ml-3"
                              style={{ fontSize: "10px", padding: "2px 5px" }}
                            >
                              New
                            </span>
                          </li>
                          <hr style={{ color: "#A9ABB3" }}></hr>
                          <li>Edit Profile</li>
                          <NavLink
                            to="/logout"
                            id="logout"
                            className="text-decoration-none"
                            style={{ color: "white" }}
                            onMouseOver={() => {
                              document.getElementById("logout").style.color =
                                "#5082ff";
                            }}
                            onMouseLeave={() => {
                              document.getElementById("logout").style.color =
                                "white";
                            }}
                          >
                            Logout
                          </NavLink>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <IconButton
                className="position-absolute p-4 fa fa-bars"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { sm: "none" },
                  color: "black",
                }}
              ></IconButton>
            </AppBar>
          </div>
        ) : (
          <div></div>
        )}
        <Box sx={{ display: "flex" }}>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  background: "black",
                  transition: "none",
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  background: "black",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            className="p-0"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {!isActive ? (
              <div className="contentBg" style={{ height: "60vh" }}>
                <div
                  className="content position-relative"
                  style={{ top: "60%" }}
                >
                  <div className="tab-content">
                    <div
                      id="home1"
                      className="active tab-pane content position-relative"
                    >
                      <div className="row mx-3">
                        <div className="col-lg-8 col-12 pr-2">
                          <div
                            className="p-3"
                            style={{
                              minHeight: "50vh",
                              borderRadius: "15px",
                              background: "#1a1a1a",
                            }}
                          >
                            <div className="text-white">
                              NOTES{" "}
                              <span
                                className="fa fa-angle-right"
                                style={{ color: "#00a82d" }}
                              ></span>
                            </div>
                            <ul
                              className="nav nav-tabs list-unstyled"
                              style={{
                                color: "black",
                                borderBottom: "none",
                                fontSize: "17px",
                              }}
                            >
                              <li className="active py-2">
                                <div
                                  className="active tab"
                                  type="button"
                                  data-toggle="tab"
                                  href="#recent"
                                >
                                  Recent
                                </div>
                              </li>
                              <li className="py-2">
                                <div
                                  className="mx-3 tab"
                                  type="button"
                                  data-toggle="tab"
                                  href="#suggested"
                                >
                                  Suggested
                                </div>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div
                                id="recent"
                                className="active tab-pane overflow-auto"
                              >
                               
                              </div>
                              <div id="suggested" className="tab-pane">
                                <div className="d-flex">
                                  {" "}
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 col-12 pl-2 mt-lg-0 mt-4">
                          <div
                            className="p-3"
                            style={{
                              minHeight: "50vh",
                              borderRadius: "15px",
                              background: "rgb(38, 37, 28)",
                              border: "1px solid rgb(111, 108, 82)",
                            }}
                          >
                            <div className="text-white">
                              SCRATCH PAD<br></br>
                              <textarea
                                rows={14}
                                type="text"
                                placeholder="Start Writing..."
                                className="border-0 bg-transparent mt-2 text-white"
                                style={{
                                  outline: "none",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12 mt-4">
                          <div
                            className="p-3"
                            style={{
                              height: "50vh",
                              borderRadius: "15px",
                              background: "#1a1a1a",
                            }}
                          >
                            <div className="text-white">RECENTLY CAPTURED</div>
                            <ul
                              className="nav nav-tabs list-unstyled"
                              style={{
                                color: "black",
                                borderBottom: "none",
                                fontSize: "17px",
                              }}
                            >
                              <li className="active py-2">
                                <div
                                  className="active mr-3 tab"
                                  type="button"
                                  data-toggle="tab"
                                  href="#images"
                                >
                                  Images
                                </div>
                              </li>
                              <li className="py-2">
                                <div
                                  className="mx-3 tab"
                                  type="button"
                                  data-toggle="tab"
                                  href="#documents"
                                >
                                  Documents
                                </div>
                              </li>
                              <li className="py-2">
                                <div
                                  className="mx-3 tab"
                                  type="button"
                                  data-toggle="tab"
                                  href="#audio"
                                >
                                  Audio
                                </div>
                              </li>
                              <li className="py-2">
                                <div
                                  className="mx-3 tab"
                                  type="button"
                                  data-toggle="tab"
                                  href="#emails"
                                >
                                  Emails
                                </div>
                              </li>
                            </ul>
                            <div
                              className="tab-content"
                              style={{ height: "83%" }}
                            >
                              <div
                                id="images"
                                className="active tab-pane"
                                style={{ height: "100%" }}
                              >
                                <div
                                  className="justify-content-center d-flex align-items-center"
                                  style={{ height: "100%" }}
                                >
                                  <div className="text-center">
                                    <img
                                      src={ImageUpload}
                                      className="img-fluid"
                                      style={{ width: "7vw" }}
                                    />
                                    <div
                                      className="text-center my-3"
                                      style={{
                                        color: "#a6a6a6",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Keep images, receipts, and records in one
                                      place.
                                    </div>
                                    <div
                                      className="btn btn-dark bg-transparent px-4 mt-4 text-primary imageBtn"
                                      style={{
                                        fontWeight: "500",
                                        border: "1px solid #737373",
                                      }}
                                    >
                                      Take a photo
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="documents"
                                className="tab-pane"
                                style={{ height: "100%" }}
                              >
                                <div
                                  className="justify-content-center d-flex align-items-center"
                                  style={{ height: "100%" }}
                                >
                                  <div className="text-center">
                                    <img
                                      src={Doc}
                                      className="img-fluid"
                                      style={{ width: "7vw" }}
                                    />
                                    <div
                                      className="text-center my-3"
                                      style={{
                                        color: "#a6a6a6",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Store PDFs, documents, and presentations
                                      for safe keeping.
                                    </div>
                                    <div
                                      className="btn btn-dark bg-transparent px-4 text-primary imageBtn mt-4"
                                      style={{
                                        fontWeight: "500",
                                        border: "1px solid #737373",
                                      }}
                                    >
                                      Save documents
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="audio"
                                className="tab-pane"
                                style={{ height: "100%" }}
                              >
                                <div
                                  className="justify-content-center d-flex align-items-center"
                                  style={{ height: "100%" }}
                                >
                                  <div className="text-center">
                                    <img
                                      src={Audio}
                                      className="img-fluid"
                                      style={{ width: "7vw" }}
                                    />
                                    <div
                                      className="text-center my-3"
                                      style={{
                                        color: "#a6a6a6",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Record meetings, lectures, and interviews.
                                    </div>
                                    <div
                                      className="btn btn-dark bg-transparent px-4 text-primary imageBtn mt-4"
                                      style={{
                                        fontWeight: "500",
                                        border: "1px solid #737373",
                                      }}
                                    >
                                      Record Audio
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="emails"
                                className="tab-pane"
                                style={{ height: "100%" }}
                              >
                                <div
                                  className="justify-content-center d-flex align-items-center"
                                  style={{ height: "100%" }}
                                >
                                  <div className="text-center">
                                    <img
                                      src={Email}
                                      className="img-fluid"
                                      style={{ width: "7vw" }}
                                    />
                                    <div
                                      className="text-center my-3"
                                      style={{
                                        color: "#a6a6a6",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Upgrade to save important emails by
                                      forwarding them to your notebooks.
                                    </div>
                                    <div
                                      className="btn btn-warning bg-transparent px-4 mt-4"
                                      style={{
                                        fontWeight: "500",
                                        color: "#f0a00d",
                                        border: "1px solid #f0a00d",
                                      }}
                                    >
                                      <span
                                        className="fa fa-bolt mr-2"
                                        style={{
                                          width: "17px",
                                          color: "black",
                                          height: "17px",
                                          background: "#f0a00d",
                                          borderRadius: "50%",
                                        }}
                                      ></span>
                                      Upgrade
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="inbox" className="tab-pane fade p-4">
                      <div
                        className="p-3"
                        style={{
                          height: "70vh",
                          borderRadius: "15px",
                          background: "#1a1a1a",
                        }}
                      >
                        <div
                          className="text-white"
                          style={{ fontWeight: "500" }}
                        >
                          <div
                            className="text-center text-primary"
                            style={{ fontSize: "30px" }}
                          >
                            Compose <span className="text-white">Email</span>
                          </div>
                          <hr
                            className="mx-auto text-white"
                            style={{ width: "70px", paddingTop: "2px" }}
                          ></hr>
                          <div className="row mt-5 mx-3">
                            <div className="col-lg-8 gx-0">
                              <form
                                ref={form}
                                className=""
                                onSubmit={sendEmail}
                              >
                                <div className="mt-lg-0 mt-5">
                                  <div className="row mr-lg-4">
                                    <div className="col-6 mb-4">
                                      <TextField
                                        className="w-100"
                                        id="filled-basic"
                                        type="text"
                                        name="name"
                                        value={mail.name}
                                        onChange={handleInputs}
                                        label="Full Name"
                                        variant="filled"
                                        sx={{
                                          color: "white",
                                          background: "#5082ff12",
                                        }}
                                      />
                                    </div>
                                    <div className="col-6 mb-4">
                                      <TextField
                                        className="w-100"
                                        id="filled-basic"
                                        type="email"
                                        name="user_email"
                                        value={mail.user_email}
                                        onChange={handleInputs}
                                        label="Email"
                                        variant="filled"
                                        sx={{
                                          color: "white",
                                          background: "#5082ff12",
                                        }}
                                      />
                                    </div>
                                    <div className="col-12">
                                      <textarea
                                        rows={5}
                                        id="filled-basic"
                                        className="w-100 p-2"
                                        placeholder="Message..."
                                        name="message"
                                        value={mail.message}
                                        onChange={handleInputs}
                                        style={{
                                          background: "#5082ff12",
                                          border: "2px solid transparent",
                                        }}
                                      ></textarea>
                                    </div>
                                  </div>
                                  <input
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    value="Send"
                                  />
                                </div>
                              </form>
                            </div>
                            <div
                              className="col-lg-4 px-4 order-lg-last order-first"
                              style={{
                                height: "100%",
                                color: "black",
                                fontWeight: "600",
                                background: "#f8f9fe",
                                borderRadius: "10px",
                                boxShadow: "1px 1px 3px 1px black",
                              }}
                            >
                              <div
                                className="text-center py-2"
                                style={{ fontSize: "18px" }}
                              >
                                Message Template
                                <div
                                  style={{ fontSize: "13px", color: "#525f7f" }}
                                >
                                  {mail.user_email}
                                </div>
                              </div>
                              <div className="mt-3">
                                <div className="" style={{ fontSize: "15px" }}>
                                  <div>
                                    Hello!{" "}
                                    <span style={{ color: "#525f7f" }}>
                                      {mail.name}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="mt-2"
                                  style={{ fontSize: "15px" }}
                                >
                                  This is a test mail...
                                </div>
                                <div
                                  className="mt-2"
                                  style={{ fontSize: "15px" }}
                                >
                                  Message:{" "}
                                  <span style={{ color: "#525f7f" }}>
                                    {mail.message}
                                  </span>
                                </div>
                              </div>
                              <div
                                className="mt-3"
                                style={{ fontSize: "12px" }}
                              >
                                Best wishes,
                              </div>
                              <div
                                className="mb-3"
                                style={{ fontSize: "12px" }}
                              >
                                HandBook team
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="dropbox" className="tab-pane fade p-4">
                      <div
                        className="p-3"
                        style={{
                          // height: "90vh",
                          borderRadius: "15px",
                          background: "#1a1a1a",
                        }}
                      >
                        <div className="text-white">RECENTLY CAPTURED</div>

                        <ul
                          className="nav nav-tabs list-unstyled"
                          style={{
                            color: "black",
                            borderBottom: "none",
                            fontSize: "17px",
                          }}
                        >
                          <li className="active py-2">
                            <div
                              className="active mr-3 tab"
                              type="button"
                              data-toggle="tab"
                              href="#images1"
                            >
                              Images
                            </div>
                          </li>
                          <li className="py-2">
                            <div
                              className="mx-3 tab"
                              type="button"
                              data-toggle="tab"
                              href="#documents1"
                            >
                              Documents
                            </div>
                          </li>
                          <li className="py-2">
                            <div
                              className="mx-3 tab"
                              type="button"
                              data-toggle="tab"
                              href="#audio1"
                            >
                              Audio
                            </div>
                          </li>
                          <li className="py-2">
                            <div
                              className="mx-3 tab"
                              type="button"
                              data-toggle="tab"
                              href="#emails1"
                            >
                              Emails
                            </div>
                          </li>
                        </ul>

                        <div className="tab-content mt-4">
                          <div
                            id="images1"
                            className="active tab-pane"
                            style={{ height: "75vh" }}
                          >
                            <div
                              className="justify-content-center d-flex align-items-center"
                              style={{ height: "100%" }}
                            >
                              <div className="w-100">
                                {file.length === 0 ? (
                                  <div className="text-center position-relative">
                                    <img
                                      src={ImageUpload}
                                      className="img-fluid"
                                      style={{ width: "7vw" }}
                                    />
                                    <div
                                      className="text-center my-3"
                                      style={{
                                        color: "#a6a6a6",
                                        fontWeight: "500",
                                      }}
                                    >
                                      Keep images, receipts, and records in one
                                      place.
                                    </div>
                                    <div
                                      className="btn btn-dark bg-transparent px-4 mt-4 text-primary imageBtn"
                                      style={{
                                        fontWeight: "500",
                                        border: "1px solid #737373",
                                      }}
                                    >
                                      Take a photo
                                    </div>
                                    <input
                                      type="file"
                                      style={{
                                        width: "139px",
                                        opacity: "0",
                                        position: "absolute",
                                        cursor: "pointer",
                                        left: "43%",
                                        top: "84%",
                                      }}
                                      onChange={handleChange}
                                      multiple
                                    />
                                  </div>
                                ) : (
                                  <div style={{ height: "74vh" }}>
                                    <div className="position-relative text-center mb-4">
                                      <div
                                        className="btn btn-dark position-absolute bg-transparent px-4 text-primary imageBtn"
                                        style={{
                                          fontWeight: "500",
                                          width: "144px",
                                          border: "1px solid #737373",
                                        }}
                                      >
                                        Take a photo
                                      </div>
                                      <input
                                        type="file"
                                        style={{
                                          width: "147px",
                                          opacity: "0",
                                          cursor: "pointer",
                                        }}
                                        onChange={handleChange}
                                        multiple
                                      />
                                    </div>
                                    <div
                                      className="d-flex flex-wrap"
                                      style={{
                                        height: "100%",
                                        overflow: "scroll",
                                        alignContent: "flex-start",
                                      }}
                                    >
                                      {file.map((image) => {
                                        return (
                                          <div
                                            className="mr-3 mb-3 position-relative"
                                            style={{
                                              width: "150px",
                                              height: "200px",
                                            }}
                                            key={image}
                                            onClick={() => console.log(image)}
                                          >
                                            <img
                                              className="uploadedImg"
                                              src={image}
                                              style={{
                                                cursor: "pointer",
                                                width: "150px",
                                                height: "200px",
                                              }}
                                            />
                                            <div
                                              id={image}
                                              className="position-absolute py-3 px-3 shadow text-dark"
                                              onMouseOver={() =>
                                                (document.getElementById(
                                                  `${image}`
                                                ).style.opacity = "1")
                                              }
                                              onMouseLeave={() =>
                                                (document.getElementById(
                                                  `${image}`
                                                ).style.opacity = "0")
                                              }
                                              style={{
                                                transition: "0.5s",
                                                background:
                                                  "rgba(0, 0, 0, 0.95)",
                                                top: 0,
                                                height: "200px",
                                                opacity: 0,
                                                width: "100%",
                                              }}
                                            >
                                              <div
                                                className="position-absolute fa fa-expand p-3 deleteImg text-white"
                                                style={{
                                                  color: "white",
                                                  left: "35%",
                                                  top: "40%",
                                                  border: "2px solid white",
                                                  transition: "0.5s",
                                                  borderRadius: "50px",
                                                  lineHeight: "0",
                                                  cursor: "pointer",
                                                }}
                                                data-target="#mymodal5"
                                                data-toggle="modal"
                                                onClick={() => viewImage(image)}
                                              ></div>
                                              <div className="justify-content-center d-flex align-items-center">
                                                <div
                                                  className="ml-auto text-white fa fa-trash-o hideText"
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() =>
                                                    removeImage(image)
                                                  }
                                                ></div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                      <div className="modal fade" id="mymodal5">
                                        <div className="modal-dialog">
                                          <div
                                            className="modal-content border-0 justify-content-center d-flex position-relative align-content-center bg-transparent"
                                            style={{ height: "93vh" }}
                                          >
                                            {Image.map((e) => {
                                              return (
                                                <div className="text-center">
                                                  <img
                                                    src={e}
                                                    className="img-fluid"
                                                    style={{
                                                      boxShadow:
                                                        "0px 0px 3px 2px #00000038",
                                                      maxHeight: "100%",
                                                    }}
                                                  />
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            id="documents1"
                            className="tab-pane"
                            style={{ height: "75vh" }}
                          >
                            <div
                              className="justify-content-center d-flex align-items-center"
                              style={{ height: "100%" }}
                            >
                              {" "}
                              <div>
                                <div className="modal fade" id="mymodal3">
                                  <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                                        {docItem && (
                                          <div>
                                            <Viewer
                                              fileUrl={open}
                                              plugins={[newPlugin]}
                                              theme="dark"
                                              onZoom={true}
                                            />
                                          </div>
                                        )}
                                      </Worker>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {docItem.length === 0 ? (
                                <div className="text-center position-relative">
                                  <img
                                    src={Doc}
                                    className="img-fluid"
                                    style={{ width: "7vw" }}
                                  />
                                  <div
                                    className="text-center my-3"
                                    style={{
                                      color: "#a6a6a6",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Store PDFs, documents, and presentations for
                                    safe keeping.
                                  </div>
                                  <div
                                    className="btn btn-dark bg-transparent px-4 mt-4 text-primary imageBtn"
                                    style={{
                                      fontWeight: "500",
                                      border: "1px solid #737373",
                                    }}
                                  >
                                    Save documents
                                  </div>
                                  <input
                                    type="file"
                                    style={{
                                      width: "139px",
                                      opacity: "0",
                                      position: "absolute",
                                      cursor: "pointer",
                                      left: "43%",
                                      top: "84%",
                                    }}
                                    onChange={docUpload}
                                    multiple
                                  />
                                </div>
                              ) : (
                                <div
                                  className="w-100"
                                  style={{ height: "74vh" }}
                                >
                                  <div className="position-relative text-center">
                                    <div
                                      className="btn btn-dark position-absolute bg-transparent px-4 text-primary imageBtn"
                                      style={{
                                        fontWeight: "500",
                                        border: "1px solid #737373",
                                      }}
                                    >
                                      Save documents
                                    </div>
                                    <input
                                      type="file"
                                      style={{
                                        width: "167px",
                                        paddingBottom: "7px",
                                        opacity: "0",
                                        cursor: "pointer",
                                      }}
                                      onChange={docUpload}
                                      multiple
                                    />
                                  </div>
                                  <div
                                    className="d-flex text-white p-2 mt-3 flex-wrap overflow-auto"
                                    style={{
                                      height: "68vh",
                                      overflow: "scroll",
                                      alignContent: "flex-start",
                                    }}
                                  >
                                    {docItem.map((document) => {
                                      return (
                                        <div
                                          className="p-3 mt-3 mr-3 itemsCard position-relative"
                                          key={document}
                                          style={{
                                            transition: "0.5s",
                                            minWidth: "172px",
                                            height: "290px",
                                            background: "#262626",
                                            borderRadius: "15px",
                                          }}
                                        >
                                          <div
                                            className="openEditor position-absolute py-3 px-3 shadow text-white"
                                            style={{
                                              left: "32%",
                                              top: "43%",
                                              border: "2px solid white",
                                              transition: "0.5s",
                                              borderRadius: "50px",
                                              lineHeight: "0",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => viewPdf(document)}
                                            data-target="#mymodal3"
                                            data-toggle="modal"
                                          >
                                            Visit
                                          </div>
                                          <div className="justify-content-center d-flex align-items-center">
                                            <div
                                              className="hideText"
                                              style={{
                                                wordBreak: "break-all",
                                                fontWeight: "500",
                                                color: "white",
                                              }}
                                            >
                                              Document
                                            </div>
                                            <div
                                              className="ml-auto text-white removeBtn"
                                              style={{
                                                fontSize: "30px",
                                                lineHeight: "0",
                                                marginBottom: "7px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                removeDoc(document)
                                              }
                                            >
                                              &times;
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            id="audio1"
                            className="tab-pane position-relative"
                            style={{ height: "75vh" }}
                          >
                            <div
                              id="audioBtn"
                              className="btn btn-dark bg-transparent px-4 text-primary imageBtn"
                              style={{
                                fontWeight: "500",
                                border: "1px solid #737373",
                                display: "none",
                                width: "fit-content",
                              }}
                              data-target="#mymodal2"
                              data-toggle="modal"
                            >
                              Record Audio
                            </div>
                            <div
                              id="saveAudio"
                              className="position-absolute mt-5"
                              style={{ top: "15px" }}
                            ></div>
                            <div
                              className="justify-content-center d-flex align-items-center"
                              style={{ height: "100%" }}
                            >
                              <div className="text-center" id="audioBg">
                                <img
                                  src={Audio}
                                  className="img-fluid"
                                  style={{ width: "7vw" }}
                                />
                                <div
                                  className="text-center my-3"
                                  style={{
                                    color: "#a6a6a6",
                                    fontWeight: "500",
                                  }}
                                >
                                  Record meetings, lectures, and interviews.
                                </div>

                                <div
                                  className="btn btn-dark bg-transparent px-4 text-primary imageBtn mt-4"
                                  style={{
                                    fontWeight: "500",
                                    border: "1px solid #737373",
                                  }}
                                  data-target="#mymodal2"
                                  data-toggle="modal"
                                >
                                  Record Audio
                                </div>
                              </div>

                              <div
                                className="modal fade"
                                id="mymodal2"
                                style={{ top: "25%" }}
                              >
                                <div className="modal-dialog">
                                  <div
                                    className="modal-content p-5"
                                    style={{ background: "#1a1a1a" }}
                                  >
                                    <div className="position-relative mt-5 justify-content-center d-flex">
                                      <AudioRecorder
                                        onRecordingComplete={(e) =>
                                          addAudioElement(e)
                                        }
                                        recorderControls={recorderControls}
                                      />
                                    </div>
                                    <div className="d-flex justify-content-center my-5">
                                      <button
                                        className="btn btn-primary border-0 mx-2"
                                        onClick={
                                          recorderControls.startRecording
                                        }
                                      >
                                        Start recording
                                      </button>
                                      <button
                                        className="btn btn-danger border-0 mx-2"
                                        onClick={recorderControls.stopRecording}
                                      >
                                        Stop recording
                                      </button>
                                      {recorderControls.recordingTime}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            id="emails1"
                            className="tab-pane"
                            style={{ height: "75vh" }}
                          >
                            <div
                              className="justify-content-center d-flex align-items-center"
                              style={{ height: "100%" }}
                            >
                              <div className="text-center">
                                <img
                                  src={Email}
                                  className="img-fluid"
                                  style={{ width: "7vw" }}
                                />
                                <div
                                  className="text-center my-3"
                                  style={{
                                    color: "#a6a6a6",
                                    fontWeight: "500",
                                  }}
                                >
                                  Upgrade to save important emails by forwarding
                                  them to your notebooks.
                                </div>
                                <div
                                  className="btn btn-warning bg-transparent px-4 mt-4"
                                  style={{
                                    fontWeight: "500",
                                    color: "#f0a00d",
                                    border: "1px solid #f0a00d",
                                  }}
                                >
                                  <span
                                    className="fa fa-bolt mr-2"
                                    style={{
                                      width: "17px",
                                      color: "black",
                                      height: "17px",
                                      background: "#f0a00d",
                                      borderRadius: "50%",
                                    }}
                                  ></span>
                                  Upgrade
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="calendar" className="tab-pane fade p-4">
                      <div
                        className="p-3"
                        style={{
                          borderRadius: "15px",
                          background: "#1a1a1a",
                        }}
                      >
                        <div
                          className="p-2"
                          style={{
                            background: "#fbfbfb",
                            borderRadius: "15px",
                          }}
                        >
                          <div
                            className="btn btn-success border-0 mb-4 mt-2"
                            data-target="#mymodal"
                            data-toggle="modal"
                            style={{
                              background: "#5082ff",
                              boxShadow:
                                "1px 1px 13px #e7e7e7, -1px -1px 13px #fff",
                            }}
                          >
                            Add Event
                          </div>

                          <div
                            className="modal fade"
                            id="mymodal"
                            style={{ top: "25%" }}
                          >
                            <div className="modal-dialog">
                              <div
                                className="modal-content"
                                style={{ background: "#1a1a1a" }}
                              >
                                <div className="px-4 py-3">
                                  <div className="d-flex pb-4">
                                    <div
                                      className=""
                                      style={{
                                        color: "#fbfbfb",
                                        fontWeight: "500",
                                        fontSize: "20px",
                                      }}
                                    >
                                      Create New Event
                                    </div>
                                    <div
                                      className="ml-auto"
                                      style={{
                                        fontSize: "40px",
                                        lineHeight: "0",
                                        marginTop: "11px",
                                        cursor: "pointer",
                                        color: "#fbfbfb",
                                      }}
                                      data-dismiss="modal"
                                    >
                                      &times;
                                    </div>
                                  </div>
                                  <div>
                                    <Box
                                      component="form"
                                      sx={{
                                        "& > :not(style)": { width: "100%" },
                                      }}
                                    >
                                      <div className="pb-4">
                                        <TextField
                                          type="text"
                                          label="Add Title"
                                          onChange={(e) =>
                                            setAddEvent({
                                              ...addEvent,
                                              title: e.target.value,
                                            })
                                          }
                                          value={addEvent.title}
                                          variant="filled"
                                          sx={{
                                            width: "100%",
                                            color: "white",
                                            input: { color: "white" },
                                          }}
                                          InputLabelProps={{
                                            style: {
                                              color: "#ffffff47",
                                              fontWeight: "400",
                                            },
                                          }}
                                          color="primary"
                                        />
                                      </div>
                                    </Box>
                                    <DatePicker
                                      className="w-100 mb-3 text-white datepicker"
                                      style={{ height: "45px" }}
                                      placeholderText="Start Date"
                                      selected={addEvent.start}
                                      onChange={(start) =>
                                        setAddEvent({ ...addEvent, start })
                                      }
                                    />
                                    <DatePicker
                                      className="w-100 mb-3 text-white datepicker"
                                      style={{ height: "45px" }}
                                      placeholderText="End Date"
                                      selected={addEvent.end}
                                      onChange={(end) =>
                                        setAddEvent({ ...addEvent, end })
                                      }
                                    />
                                    <div className="mt-3">
                                      <button
                                        className="btn btn-primary border-0"
                                        onClick={handleEvent}
                                        data-dismiss="modal"
                                        style={{
                                          background: "rgb(53 102 223)",
                                        }}
                                      >
                                        Add Event
                                      </button>
                                      <button
                                        className="btn btn-primary border-0 ml-3"
                                        data-dismiss="modal"
                                        style={{
                                          background: "rgb(53 102 223)",
                                        }}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Calendar
                            localizer={localizer}
                            events={allEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: "80vh" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div id="transactions" className="tab-pane fade p-4">
                      <div
                        className="p-3"
                        style={{
                          // height: "105vh",
                          borderRadius: "15px",
                          background: "#1a1a1a",
                        }}
                      >
                        <div
                          className="btn btn-primary"
                          data-target="#mymodal4"
                          data-toggle="modal"
                        >
                          Add Transactions
                        </div>
                        <div className="text-dark">
                          <ul className="nav nav-tabs border-0 justify-content-center">
                            <li className="nav-item">
                              <div
                                className="nav-link border-0 bg-transparent tab active"
                                style={{
                                  height: "40px",
                                  color: "white",
                                  fontWeight: "500",
                                }}
                                data-toggle="tab"
                                data-target="#table"
                                type="button"
                              >
                                {" "}
                                Tabular View
                              </div>
                            </li>
                            <li className="nav-item">
                              <div
                                className="nav-link border-0 bg-transparent tab"
                                style={{
                                  height: "40px",
                                  color: "white",
                                  fontWeight: "500",
                                }}
                                data-toggle="tab"
                                data-target="#graph"
                                type="button"
                              >
                                {" "}
                                Graphical View
                              </div>
                            </li>
                          </ul>

                          <div
                            className="bg-white my-4"
                            style={{ borderRadius: "15px" }}
                          >
                            <div className="d-flex align-items-center p-3 overflow-auto">
                              <div className="mr-4">
                                <TextField
                                  type="text"
                                  label="Name"
                                  name="name"
                                  onChange={handleTransaction}
                                  value={transaction.name}
                                  variant="outlined"
                                  color="primary"
                                  style={{ minWidth: "180px" }}
                                />
                              </div>
                              <div className="mx-4">
                                <TextField
                                  type="text"
                                  label="Transation Amount"
                                  name="amount"
                                  onChange={handleTransaction}
                                  value={transaction.amount}
                                  variant="outlined"
                                  color="primary"
                                  style={{ minWidth: "150px" }}
                                />
                              </div>
                              <div className="mx-4">
                                <input
                                  type="date"
                                  name="date"
                                  className="form-control shadow-none"
                                  style={{ height: "56px" }}
                                  onChange={handleTransaction}
                                  value={transaction.date}
                                />
                              </div>
                              <div className="mx-4 d-flex align-items-center">
                                <input
                                  className="form-check mr-2"
                                  name="status"
                                  type="radio"
                                  value="Successful"
                                  onChange={handleTransaction}
                                  style={{ width: "20px", cursor: "pointer" }}
                                />
                                <label>Successful</label>
                              </div>
                              <div className="mx-4 d-flex align-items-center">
                                <input
                                  className="form-check mr-2"
                                  name="status"
                                  type="radio"
                                  value="Failed"
                                  onChange={handleTransaction}
                                  style={{ width: "20px", cursor: "pointer" }}
                                />
                                <label>Failed</label>
                              </div>
                              <div className="mx-4 d-flex align-items-center">
                                <input
                                  className="form-check mr-2"
                                  name="status"
                                  type="radio"
                                  value="Pending"
                                  onChange={handleTransaction}
                                  style={{ width: "20px", cursor: "pointer" }}
                                />
                                <label>Pending</label>
                              </div>
                              <button
                                className="btn btn-primary ml-auto ml-4 p-3 shadow border-0"
                                onClick={addItems}
                                data-dismiss="modal"
                                style={{
                                  background: "rgb(53 102 223)",
                                  borderRadius: "10px",
                                }}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                          <div className="tab-content">
                            <div
                              id="table"
                              className="active tab-pane fade show"
                            >
                              <div
                                className="justify-content-center overflow-auto"
                                style={{ height: "55vh" }}
                              >
                                <table className="bg-white w-100">
                                  <tr style={{ top: "0", position: "sticky" }}>
                                    <th>S.No</th>
                                    <th style={{ minWidth: "200px" }}>
                                      User Name
                                    </th>
                                    <th style={{ minWidth: "200px" }}>Email</th>
                                    <th style={{ minWidth: "200px" }}>
                                      Transaction Date
                                    </th>
                                    <th>Transaction Time</th>
                                    <th>Transaction ID</th>
                                    <th>Receipt No.</th>
                                    <th>Transaction Amount</th>
                                    <th>Currency</th>
                                    <th>Transaction Status</th>
                                  </tr>
                                  {details?.map((e, key) => {
                                    return (
                                      <tr>
                                        <td>{key + 1}</td>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.txnDate ?? e.txnDate}</td>
                                        <td>{e.txnTime}</td>
                                        <td>{e.paymentId}</td>
                                        <td>{e.receipt}</td>
                                        <td>{e.amount}</td>
                                        <td>{e.currency}</td>
                                        <td>{e.status || "success"}</td>
                                      </tr>
                                    );
                                  })}
                                </table>
                              </div>
                            </div>
                            <div id="graph" className="tab-pane fade">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-lg-0 mb-md-0 mb-4">
                                  <div
                                    className="py-4 rounded border-0 text-white"
                                    style={{
                                      background: "#262626",
                                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                      minHeight: "196px",
                                    }}
                                  >
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-lg-6 col-md-12 col-12">
                                          <h5>Successful Transactions</h5>
                                          <h4 className="font-weight-bold">
                                            {details.length + successfull || 0}
                                          </h4>
                                          <div className="color">
                                            <div className="fa fa-arrow-up fa-rotate-45 fa-lg font-weight-lighter pt-1"></div>
                                            <h6 className="px-4 pt-1">
                                              +
                                              {Math.round(
                                                (successfull / details.length) *
                                                  100
                                              ) / 100 || 0.6}
                                              %
                                            </h6>
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-12 d-flex justify-content-end">
                                          <div style={{ width: "120px" }}>
                                            <CircularProgressbar
                                              value={details.length || 0}
                                              text={`${details.length || 0}%`}
                                              styles={buildStyles({
                                                pathColor: "#4343cb",
                                                textColor: "#4343cb",
                                                trailColor: "grey",
                                              })}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-lg-0 mb-md-0 mb-4">
                                  <div
                                    className="py-4 rounded border-0 text-white"
                                    style={{
                                      background: "#262626",
                                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                      minHeight: "196px",
                                    }}
                                  >
                                    <div className="container">
                                      <div className="row ">
                                        <div className="col-lg-6 col-md-12 col-12 ">
                                          <h5>Pending Transactions</h5>
                                          <h4 className="font-weight-bold">
                                            {pending || 0}
                                          </h4>
                                          <div className="">
                                            <div className="fa fa-arrow-up fa-rotate-45 fa-lg font-weight-lighter text-white pt-1"></div>
                                            <h6 className="px-4 pt-1">
                                              +
                                              {Math.round(
                                                (pending / details.length) * 100
                                              ) / 100 || 0.6}
                                              %
                                            </h6>
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-12 d-flex justify-content-end">
                                          <div style={{ width: "120px" }}>
                                            <CircularProgressbar
                                              value={
                                                (pending / details.length) *
                                                  100 || 0
                                              }
                                              text={`${
                                                Math.round(
                                                  (pending / details.length) *
                                                    100
                                                ) || 0
                                              }%`}
                                              styles={buildStyles({
                                                pathColor: "#ff9800",
                                                textColor: "#ff9800",
                                                trailColor: "grey",
                                              })}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-lg-0 mb-md-0 mb-4">
                                  <div
                                    className="py-4 rounded border-0 text-white"
                                    style={{
                                      background: "#262626",
                                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                      minHeight: "196px",
                                    }}
                                  >
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-lg-6 col-md-12 col-12">
                                          <h5>Failed Transactions</h5>
                                          <h4 className="font-weight-bold">
                                            {failed || 0}
                                          </h4>
                                          <div className="color1">
                                            <div className="fa fa-arrow-up fa-rotate-45 fa-lg  font-weight-lighter pt-1"></div>
                                            <h6 className="px-4 pt-1">
                                              +
                                              {Math.round(
                                                (failed / details.length) * 100
                                              ) / 100 || 0.6}
                                              %
                                            </h6>
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-12 d-flex justify-content-end">
                                          <div style={{ width: "120px" }}>
                                            <CircularProgressbar
                                              value={
                                                (failed / details.length) *
                                                  100 || 0
                                              }
                                              text={`${
                                                Math.round(
                                                  (failed / details.length) *
                                                    100
                                                ) || 0
                                              }%`}
                                              styles={buildStyles({
                                                pathColor: "#c02d2d",
                                                textColor: "#c02d2d",
                                                trailColor: "grey",
                                              })}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-8 col-12 mt-lg-4 mt-md-4 mb-lg-0 mb-4">
                                  <div
                                    className="rounded border-0 text-white"
                                    style={{
                                      background: "#262626",
                                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                      height: "100%",
                                    }}
                                  >
                                    <nav className="navbar rounded navbar-expand-lg navbar-light">
                                      <div className="container-fluid">
                                        <a className="navbar-brand text-white">
                                          Transactions
                                        </a>

                                        <ul className="navbar-nav">
                                          <li className="nav-item">
                                            <a
                                              className="nav-link active text-white"
                                              aria-current="page"
                                              href="#"
                                            >
                                              This Year
                                            </a>
                                          </li>
                                          <li className="nav-item">
                                            <a
                                              className="nav-link text-white"
                                              href="#"
                                            >
                                              This Week
                                            </a>
                                          </li>
                                          <li className="nav-item">
                                            <a
                                              className="nav-link text-white"
                                              href="#"
                                            >
                                              Today
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </nav>
                                    <div className="container">
                                      <Line
                                        className="chart w-100"
                                        style={{ height: "100%" }}
                                        data={{
                                          labels: month,
                                          // labels: details?.map((e) => e.status),
                                          datasets: [
                                            {
                                              label: "Transactions 2022",
                                              data: actualData.map(
                                                (e) => e.amount
                                              ),
                                              borderColor: [
                                                "rgba(194, 44, 44, 0.87)",
                                              ],
                                              backgroundColor: [
                                                "rgba(197, 60, 60, 0.596)",
                                              ],
                                              // pointBackgroundColor: [
                                              //   "rgba(194, 44, 44, 0.87)",
                                              //   "rgba(194, 44, 44, 0.87)",
                                              //   "rgba(194, 44, 44, 0.87)",
                                              //   "rgba(194, 44, 44, 0.87)",
                                              //   "white",
                                              // ],

                                              fontColor: ["White"],
                                              fill: {
                                                target: "origin",
                                                above:
                                                  "rgba(197, 60, 60, 0.596)",
                                              },
                                            },
                                            {
                                              label: "Transactions 2021",

                                              data: details?.map(
                                                (e) => e.status
                                              ),
                                              borderColor: [
                                                "rgba(161, 223, 17, 0.568)",
                                              ],
                                              backgroundColor: [
                                                "rgba(161, 223, 17, 0.568)",
                                              ],
                                              pointBackgroundColor: [
                                                "rgba(161, 223, 17, 0.568)",
                                                "rgba(161, 223, 17, 0.568)",
                                                "rgba(161, 223, 17, 0.568)",
                                                "rgba(161, 223, 17, 0.568)",
                                                "white",
                                              ],
                                            },
                                          ],
                                          fontColor: "white",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-4 col-12 mt-lg-4">
                                  <div
                                    className="justify-content-center d-flex align-items-center border-0 text-white py-4"
                                    style={{
                                      background: "#262626",
                                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                    }}
                                  >
                                    <h5 className="mx-4 mt-5 position-absolute">
                                      Transactions
                                    </h5>
                                    <div className="container">
                                      <h5 className="font-weight-bold">
                                        All Transactions
                                      </h5>
                                      <Doughnut
                                        className="doughnut justify-content-center d-flex pb-2 gx-0 my-auto"
                                        data={{
                                          labels: [
                                            "Successfull",
                                            "Pending",
                                            "Failed",
                                          ],

                                          datasets: [
                                            {
                                              label: "Transactions",
                                              data: [
                                                successfull,
                                                pending,
                                                failed,
                                              ],

                                              backgroundColor: [
                                                "purple",
                                                "#dc3545",
                                                "rgba(13, 124, 228, 0.808)",
                                              ],
                                              hoverOffset: 4,
                                            },
                                          ],
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="modal fade"
                        id="mymodal4"
                        style={{ top: "25%" }}
                      >
                        <div className="modal-dialog">
                          <div
                            className="modal-content"
                            style={{ background: "#1a1a1a" }}
                          >
                            <div className="px-4 py-3">
                              <div className="d-flex pb-4">
                                <div
                                  className=""
                                  style={{
                                    color: "#fbfbfb",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                  }}
                                >
                                  Create New Event
                                </div>
                                <div
                                  className="ml-auto"
                                  style={{
                                    fontSize: "40px",
                                    lineHeight: "0",
                                    marginTop: "11px",
                                    cursor: "pointer",
                                    color: "#fbfbfb",
                                  }}
                                  data-dismiss="modal"
                                >
                                  &times;
                                </div>
                              </div>
                              <div>
                                <Box
                                  component="form"
                                  sx={{
                                    "& > :not(style)": { width: "100%" },
                                  }}
                                >
                                  <div className="pb-4">
                                    <TextField
                                      type="text"
                                      label="Name"
                                      name="name"
                                      onChange={handleTransaction}
                                      value={transaction.name}
                                      variant="filled"
                                      sx={{
                                        width: "100%",
                                        color: "white",
                                        input: { color: "white" },
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color: "#ffffff47",
                                          fontWeight: "400",
                                        },
                                      }}
                                      color="primary"
                                    />
                                    <TextField
                                      type="text"
                                      label="Transation Amount"
                                      name="amount"
                                      onChange={handleTransaction}
                                      value={transaction.amount}
                                      variant="filled"
                                      sx={{
                                        width: "100%",
                                        color: "white",
                                        input: { color: "white" },
                                      }}
                                      InputLabelProps={{
                                        style: {
                                          color: "#ffffff47",
                                          fontWeight: "400",
                                        },
                                      }}
                                      color="primary"
                                    />
                                  </div>
                                </Box>
                                <input
                                  type="date"
                                  name="date"
                                  className="form-control"
                                  onChange={handleTransaction}
                                  value={transaction.date}
                                />
                                <div className="text-white d-flex mt-4">
                                  <div className="w-50 p-2 d-flex justify-content-center align-items-center">
                                    <input
                                      className="form-check mr-2"
                                      name="status"
                                      type="radio"
                                      value="Successful"
                                      onChange={handleTransaction}
                                      style={{ width: "20px" }}
                                    />
                                    <label>Successful</label>
                                  </div>
                                  <div className="w-50 p-2 d-flex justify-content-center align-items-center">
                                    <input
                                      className="form-check mr-2"
                                      name="status"
                                      type="radio"
                                      value="Failed"
                                      onChange={handleTransaction}
                                      style={{ width: "20px" }}
                                    />
                                    <label>Failed</label>
                                  </div>
                                  <div className="w-50 p-2 d-flex justify-content-center align-items-center">
                                    <input
                                      className="form-check mr-2"
                                      name="status"
                                      type="radio"
                                      value="Pending"
                                      onChange={handleTransaction}
                                      style={{ width: "20px" }}
                                    />
                                    <label>Pending</label>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <button
                                    className="btn btn-primary border-0"
                                    onClick={addItems}
                                    data-dismiss="modal"
                                    style={{
                                      background: "rgb(53 102 223)",
                                    }}
                                  >
                                    Add Event
                                  </button>
                                  <button
                                    className="btn btn-primary border-0 ml-3"
                                    data-dismiss="modal"
                                    style={{
                                      background: "rgb(53 102 223)",
                                    }}
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="mt-4"
                      style={{ borderTop: "1px solid #80808061" }}
                    >
                      <div className="text-white mx-4 py-4">
                        <div className="d-flex align-items-center mx-1">
                          <div
                            className="fa fa-user fa-3x d-flex align-items-center justify-content-center"
                            style={{
                              borderRadius: "50px",
                              width: "60px",
                              height: "60px",
                              background: "rgb(80, 130, 255)",
                            }}
                          ></div>
                          <div className="mx-3">
                            <div className="" style={{ fontWeight: "500" }}>
                              CUSTOMIZE YOUR HOME
                            </div>
                            <div>
                              With Hand Book you can add and remove widgets,
                              reorder and resize them, or change your
                              background.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="d-flex align-items-center p-2 px-3">
                  {!isExpanded ? (
                    <div
                      className="fa fa-expand mr-3 fa-md"
                      style={{
                        background: "#737373",
                        padding: "5px",
                        color: "black",
                        cursor: "pointer",
                        borderRadius: "2px",
                      }}
                      onClick={resizeEditor}
                    ></div>
                  ) : (
                    <div
                      className="fa fa-compress mr-3 fa-md"
                      style={{
                        background: "#737373",
                        padding: "5px",
                        color: "black",
                        cursor: "pointer",
                        borderRadius: "2px",
                      }}
                      onClick={compressEditior}
                    ></div>
                  )}
                  <div style={{ color: "#737373" }}>|</div>
                  <div
                    className="btn btn-success border-0 px-4 ml-3"
                    onClick={closeEditor}
                  >
                    Exit
                  </div>
                  <div className="ml-auto d-flex align-items-center">
                    <div className="mr-4" style={{ color: "#737373" }}>
                      Only you
                    </div>
                    <div
                      id="save"
                      className="btn btn-primary border-0 px-4 mr-4"
                      style={{ background: "#5082ff", display: "none" }}
                      onClick={submit}
                    >
                      Save
                    </div>

                    <div
                      className=""
                      style={{
                        fontSize: "45px",
                        // lineHeight: "0",
                        marginTop: "-30%",
                        color: "#737373",
                      }}
                    >
                      ...
                    </div>
                  </div>
                </div>
                <form onSubmit={submit}>
                  <div
                    className="editor position-relative"
                    style={{
                      background: "#262626",
                      // height: "100vh",
                      width: "100%",
                    }}
                  >
                    <Editor
                      id="editor"
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      editorState={description}
                      onEditorStateChange={onEditorStateChange}
                      placeholder="Start Writing..."
                      spellCheck={true}
                    />
                    <input
                      required
                      type="text"
                      name="title"
                      style={{ top: "60px", fontSize: "48px", outline: "none" }}
                      value={userInfo.title || ""}
                      onChange={onChangeValue}
                      className="position-absolute text-white bg-transparent titleInput shadow-none form-control border-0"
                      placeholder="Title"
                    />
                    <textarea
                      style={{ display: "none" }}
                      disabled
                      ref={(val) => (userInfo.description = val)}
                      value={draftToHtml(
                        convertToRaw(description.getCurrentContent())
                      )}
                    />
                  </div>
                  <div
                    className="p-4 w-100"
                    style={{
                      background: "rgb(38, 38, 38)",
                      bottom: "0",
                      position: "fixed",
                      boxShadow: "0px -1px 2px -1px #c0c0c099",
                    }}
                  ></div>
                </form>
              </div>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
//API= https://calendarific.com/account
