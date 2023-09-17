import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";
import { useNavigate } from "react-router-dom";

function Tour() {
  const [runTour, setRunTour] = useState(false);
  const navigate = useNavigate();

  const tourSteps = [
    // Define steps
    {
      target: ".navbox",
      content: "This tab contains all features of the webapp",
    },
    {
      target: ".facts",
      content: "Click here to get facts related to Environment",
    },
    // {
    //   target: buttonRef.current,
    //   content: "This is a Chakra UI Button element.",
    //   placement: "bottom",
    // },
  ];
  useEffect(() => {
    if (window.location.pathname === "/") {
      setRunTour(true);
    }
  }, []);

  // Handle the tour finish event
  const handleTourFinish = () => {
    // Perform actions when the tour is finished
  };

  return (
    <Joyride
      steps={tourSteps}
      run={runTour}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      callback={handleTourFinish}
    />
  );
}

export default Tour;
