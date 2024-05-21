// DownloadPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./DownloadPage.module.css";

const link1 = "Your backend link";

const DownloadPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [err, setErr] = useState();
  const [btn, setBtn] = useState("Download");
  // const [id, setId] = useState();
  // const [downloaded, setDownloaded] = useState(null);  

  const handleDownload = async () => {
    if (!password) {
      setError(true);
      return false;
    }
    try {
      setBtn("loading...");
      const IP = await getData();
      const response = await axios.post(
        `${link1}/api/download`,
        {
          password,
          IP,
        }
      );

      if (response.data.msg === "wrong ip") {
        console.log("wrong ip");
        setErr("wrong ip");
        setBtn("Download");
        return false;
      }
      if (response.data.msg === "invalid password") {
        console.log("invalid password");
        setErr("invalid password");
        setBtn("Download");
        return false;
      }
      if (response.data.msg === "restricted ip") {
        console.log("restricted ip");
        setErr("restricted ip");
        setBtn("Download");
        return false;
      }
      if (response.data.msg === "something went wrong") {
        console.log("something went wrong");
        setErr("something went wrong");
        setBtn("Download");
        return false;
      }
      const lik = document.createElement("a");
      lik.href = `${link1}/file/${password}`;
      document.body.appendChild(lik);
      lik.click();

      console.log("File downloaded successfully");
      setBtn("Download");
    } catch (error) {
      console.error("File download failed", error);
      setBtn("Download");
    }
  };

  const getData = async () => {
    let res = await fetch("https://geolocation-db.com/json/");//YOUr id address
    res = await res.json();
    console.log(res.IPv4);
    let IP = res.IPv4;
    return IP;
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.formcontainer}>
        <h2 className={classes.h2}>Download Page</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        {error && !password && <p>Please Enter A Password</p>}
        <p>{err}</p>
        <br></br>
        <div className="btndiv">
          <button className={classes.button} onClick={handleDownload}>
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
