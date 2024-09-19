import { useState } from "react";
import vid from "../src.mp4";
import "./App.css";
import Recommend from "./Components/Recommend";
import { uploadToIpfs } from "./Utilities/UploadToIpfs";

function App() {
  const [count, setCount] = useState(0);
  const [buffer, setBuffer] = useState();
  const [title, setTitle] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    await uploadToIpfs(buffer, title);
    console.log("hello");
  }
  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    console.log(file.size); // Check the file size
    console.log(file.type);

    reader.onloadend = () => {
      const buffer = new Uint8Array(reader.result);
      setBuffer(buffer);
      console.log("buffer", buffer);
    };
  };

  return (
    <>
      <div className="main">
        <h1>Web3 Youtube</h1>
        <div className="video-container">
          <video controls src="../src.mp4">
            <source src="../src.mp4" type="mp4" />
            Your browser does not support the video tag.
          </video>
          <form onSubmit={handleSubmit} className="input-field">
            <input
              type="file"
              placeholder="Enter your video here!"
              className="video-upload"
              onChange={captureFile}
            />
            <input
              type="text"
              placeholder="Enter title of video"
              required
              style={{ margin: "5px" }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>
              Click to upload
            </button>
          </form>
        </div>
        <div>
          <h3>Up Next...</h3>
          <Recommend />
        </div>
      </div>
    </>
  );
}

export default App;
