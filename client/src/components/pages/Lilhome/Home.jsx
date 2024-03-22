import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Team1 from './HomePageAssets/mom1.mp4';
import Team2 from './HomePageAssets/father1.mp4';
import Team3 from './HomePageAssets/mom2.mp4';
import './Banner_homepage.css'; 
import Navbarmain from "../../NavbarMain/Navbarmain";
import Footer from "../footer/Footer";

const Banner_homepage = () => {
  const navigate = useNavigate();
  const videoRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleButtonClick = () => {
    navigate('/abouts');
  };

  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % videoRefs.current.length;
    setCurrentVideoIndex(nextIndex);
    videoRefs.current[nextIndex].current.play();
  };

  return (
    <>
      <Navbarmain />
      <div
        className="banner-container"
      >
        {videoRefs.current.map((videoRef, index) => (
          <video
            key={index}
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onEnded={handleVideoEnd}
            className={`banner-video ${
              index === currentVideoIndex ? 'visible' : ''
            }`}
          >
            <source
              src={
                index === 0
                  ? Team1
                  : index === 1
                  ? Team2
                  : Team3
              }
              type="video/mp4"
            />
          </video>
        ))}
        <div className="banner-left">
          <div className="text-content">
            <div>
              <span>Dear Father and Mother</span>
            </div>
            <div>
              <span>Welcome</span>
            </div>
            <div>
              <p>
                "Grow with Child" community. It brings us immense joy to
                accompany you on this incredible journey of parenting,
                witnessing your child's growth, and celebrating every precious
                milestone.
              </p>
            </div>
            <button onClick={handleButtonClick}>Abouts</button>
          </div>
        </div>
       
      </div>
      <Footer/>
    </>
  );
};

export default Banner_homepage;
