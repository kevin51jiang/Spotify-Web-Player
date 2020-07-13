import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

import "./MonthlyPlaylist.css";

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const playlistUri = isDev()
  ? "spotify:playlist:6tvlZFvjmPFsIkX5WrdzBl"
  : "spotify:playlist:37i9dQZEVXbMDoHDwVN2tF";

const MonthlyPlaylist = (props) => {
  const [extended, setExtended] = useState(false);

  return (
    <div
      className={`monthly-playlist monthly-playlist${
        extended ? "--extended" : "--hidden"
      }`}
    >
      <div className="pullout-wrapper">
        <button
          className="slideout"
          onClick={() => setExtended(!extended)}
          role="tabpanel"
        >
          {extended ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </button>
      </div>
      <div className="pullout-body">
        <button
          onClick={() => {
            console.log("Playing montly playlist");
            props.togglePlay(playlistUri);
          }}
        >
          Play Global Top 50
        </button>
      </div>
    </div>
  );
};

export default MonthlyPlaylist;
