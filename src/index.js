import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Movies from "./components/movies";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import bg_img from "./img/background.jpg";

ReactDOM.render(
  <React.StrictMode>
    <img id="background-img" className="bg" src={bg_img} alt="bg_img"></img>
    <Movies />
    <footer>
      Background image Designed and provide by{" "}
      <a href="http://www.freepik.com" target="_blank" rel="noreferrer">
        starline / Freepik
      </a>
      <div>
        Favicon made by{" "}
        <a
          href="https://www.flaticon.com/authors/photo3idea-studio"
          title="photo3idea_studio"
          target="_blank"
          rel="noreferrer"
        >
          photo3idea_studio
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </footer>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
