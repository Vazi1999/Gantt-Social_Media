import React from "react";
import './public/style.css';
import Carousel from "./Carousel";
import { Comment , Like , Foward , instgramCircle , Save} from '../assets/images';

function Post(props){
  return (
    <div className="post">
      <div className="div">
        <div className="text-wrapper">{props.username}</div>
        <div className="uploadTime">{props.upload}</div>
        <img className="ellipse" alt="Ellipse" src={instgramCircle} />
        <Carousel slides={props.slides} type={props.type}/>
        <div className="group">
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-4" />
        </div>
        <p className="p"> {props.description}</p>
        <img className="vector" alt="Vector" src={Like} />
        <img className="vector-stroke" alt="Vector stroke" src={Comment} />
        <img className="img" alt="Vector stroke" src={Foward} />
        <img className="vector-stroke-2" alt="Vector stroke" src={Save} />
      </div>
    </div>
  );
};

export default Post;
