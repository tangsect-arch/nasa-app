import React from "react";

export default function SideBar({ handleToggleModal, data } = props) {
  return (
    <div className="sidebar">
      <div className="bgOverlay"></div>
      <div className="sidebarContents">
        <h2>{data.title}</h2>
        <div className="descriptionContainer">
          <p className="descriptionTitle"> Description</p>
          <p>{data.explanation}</p>
        </div>
        <button
          onClick={() => {
            handleToggleModal();
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
