import React from "react";
import "./GuideOverview.css";

const GuideOverview = () => {
  return (
    <div className="guide-container">
      <h1 className="title">Steps on How to Use The Campus Map</h1>

      <div className="steps-container">
        {/* Step 1 */}
        <div className="step-box">
          <h1>Step 1:</h1>
          <p>Specify your current location and select your destination.</p>
            <img src="\assets\currentLocationandDestination.PNG" alt="Picture sa currentlocation" />
        </div>

        {/* Step 2 */}
        <div className="step-box">
          <h1>Step 2:</h1>
          <p>Click set route to find your destination.</p>
          <button className="btn-primary">Set Route</button>
          <p>Click this to go back to the home page.</p>
          <button className="btn-secondary">Back to Main Page</button>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-container">
        <h2>Watch the demonstration of the campus navigation</h2>
        <video controls>
          <source src="scr\images\DemoVid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <button 
        className="BackBtn"
        onClick={() => window.location.href = "/"}>
        Back to Main Page
      </button>
    </div>
  );
};

export default GuideOverview;
