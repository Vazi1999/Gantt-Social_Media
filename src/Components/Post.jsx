import React from "react";
import "./public/style.css";
import Carousel from "./Carousel";

function Post(props){
  return (
    <div className="post">
      <div className="div">
        <div className="text-wrapper">{props.username}</div>
        <img className="ellipse" alt="Ellipse" src="../src/Components/instagram_svg/ellipse-1.svg" />
        <Carousel slides={props.slides}/>
        <div className="group">
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-4" />
        </div>
        <p className="p"> {props.description}</p>
        <img className="vector" alt="Vector" src="../src/Components/instagram_svg/vector.svg" />
        <img className="vector-stroke" alt="Vector stroke" src="../src/Components/instagram_svg/vector-stroke-2.svg" />
        <img className="img" alt="Vector stroke" src="../src/Components/instagram_svg/vector-stroke-1.svg" />
        <img className="vector-stroke-2" alt="Vector stroke" src="../src/Components/instagram_svg/vector-stroke.svg" />
      </div>
    </div>
  );
};

export default Post;
