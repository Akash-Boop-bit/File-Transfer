// UploadPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
const link = "Your backend link";
import classes from "./UploadPage.module.css";



const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  // const [date, setDate] = useState(0);
  // const [month, setMonth] = useState(0);
  // const [year, setYear] = useState(0);
  const [hour, setHour] = useState();
  const [min, setmin] = useState();
  const [sec, setSec] = useState();
  // const [expiry, setExpiry] = useState(0);
  const [error, setError] = useState(false);
  const [particular, setParticular] = useState("");
  const [inputs, setInputs] = useState([""]); // State to store the array of input values
  const [upload, setUpload] = useState();
  const [btn, setBtn] = useState("upload");
  const [uploaded, setUploaded] = useState(null);
  const [advanced, setAdvanced] = useState(false);
  const [advbtn, setAdvbtn] = useState("Show");
  

  // Function to handle adding an input field
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  // Function to handle removing an input field
  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  // Function to handle changes to an input value
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!password || !hour || !min || !sec) {
      setError(true);
      return false;
    }
    if (hour < 0) {
      setHour(0);
    }
    if (min < 0) {
      setmin(0);
    }
    if (sec < 0) {
      setSec(0);
    }
    let hr = Number(Number(hour) * 60 * 60 * 1000);
    let m = Number(Number(min) * 60 * 1000);
    let s = Number(Number(sec) * 1000);
    let expiry = Number(Number(hr) + Number(m) + Number(s));

    if (file && password) {
      setBtn("loading...");
      let auth = localStorage.getItem("id");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);
      formData.append("particular", particular);
      formData.append("inputs", inputs);
      formData.append("expiry", expiry);
      formData.append("userid", auth);

      try {
        await axios.post(`${link}/api/upload`, formData, {
          onUploadProgress: (data) => {
            setUploaded(Math.round((data.loaded / data.total) * 100));
          },
        });
        console.log("File uploaded successfully");
        setUpload("File Uploaded Successfully");
        setBtn("Upload");
      } catch (error) {
        console.log("File upload failed", error);
        setUpload("File Upload Failed");
        setBtn("Upload");
      }
    } else {
      console.error("Please select a file and set a password");
    }
  };

  const onAdvanced = () => {
    setAdvanced(!advanced);
    if (advbtn === "Show") {
      setAdvbtn("Hide");
    } else {
      setAdvbtn("Show");
    }
  };

  return (
    <div className={classes.form}>
      <h1 className={classes.h1}>Upload Page</h1>
      <div className={classes.formgroup}>
        <input
          className={classes.fileinp}
          type="file"
          onChange={handleFileChange}
        />
      </div>

      <div className={classes.formgroup}>
        <h2>Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error && !password && <p>Please Enter A Password</p>}
      </div>

      <div className={classes.formgroup}>
        <h2>Expiration time</h2>
        <span>Hour</span>
        <input
          type="number"
          placeholder="Hour"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <br></br>
        <span>Minute</span>
        <input
          type="number"
          placeholder="Minute"
          value={min}
          onChange={(e) => setmin(e.target.value)}
        />
        <br></br>
        <span>Second</span>
        <input
          type="number"
          placeholder="Second"
          value={sec}
          onChange={(e) => setSec(e.target.value)}
        />
        <br></br>

        {error && (!hour || !min || !sec) && (
          <p>Please enter expiration time</p>
        )}
      </div>

      {/* show and hide button for ips */}
      <button className={classes.button} onClick={onAdvanced}>
        {advbtn} Advanced Options
      </button>
      <br></br>

      {advanced && (
        <>
          <div className={classes.formgroup}>
            <h2>Particular IP (Optional)</h2>
            <input
              type="text"
              value={particular}
              onChange={(e) => setParticular(e.target.value)}
            />
          </div>
          <div className={classes.formgroup}>
            {/* Map over the array of input values and render input fields */}
            <h2>Add Restricted IPs (optional)</h2>
            {inputs.map((input, index) => (
              <div key={index}>
                <input
                  className={classes.restinp}
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                {/* Button to remove the input field */}
                <button
                  className={classes.btn}
                  type="button"
                  onClick={() => removeInput(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* Button to add an input field */}
          <button
            className={classes.buttonalt}
            type="button"
            onClick={addInput}
          >
            Add Input
          </button>
        </>
      )}
      <br></br>
      {uploaded && (
        <div className="progress mt-2">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={uploaded}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${uploaded}%` }}
          >
            {`${uploaded}%`}
          </div>
        </div>
      )}
      <h1>{upload}</h1>
      <br></br>
      <div className="btndiv">
        <button className={classes.buttonmulti} onClick={handleFileUpload}>
          {btn}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
