import React from "react";
import { useDispatch } from "react-redux";
import { toggleActive } from "../Redux/Actions";
import logo from "../../images/delete.png";

export const Quizzes = ({ title, serial, active, id, date, openModel }) => {
  const dispatch = useDispatch();

  const ActiveHandler = (id) => {
    dispatch(toggleActive(id));
  };

  return (
    <>
      <div className="all-quiz d-flex">
        <div className="all-quiz-srNo">{serial}</div>
        <div className="all-quiz-title" style={{ fontWeight: "600" }}>
          {title.toUpperCase()}
        </div>
        <div className="all-quiz-active d-flex">
          <p>{active ? "Active" : "Inactive"}</p>
          <button
            style={{ backgroundColor: `${active ? "green" : "grey"}` }}
            onClick={() => ActiveHandler(id)}
          >
            <div
              className="circle"
              style={{ right: `${active ? "-25px" : 0}` }}
            ></div>
          </button>
        </div>
        <div className="all-quiz-time">
          {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`}
        </div>
        <div className="all-quiz-actions">
          <img
            src={logo}
            alt=""
            width="40px"
            style={{ cursor: "pointer" }}
            onClick={() => openModel(id)}
          />
        </div>
      </div>
    </>
  );
};
