import React from "react";
import spinner from "../images/spinner.gif";

export default function Spinner() {
  return (
    <div className="Spinner">
      <img src={spinner} alt="Please Wait..." />
    </div>
  );
}
