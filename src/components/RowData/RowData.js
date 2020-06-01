import React, { useState, useEffect } from "react";
import "../commonStyles.css";

const RowData = ({
  id,
  comments,
  points,
  title,
  url,
  storyUrl,
  author,
  created,
  storyTitle,
  text
}) => {
  const upvote = points || 0;

  const [hiddenId, setHiddenId] = useState([]);
  const [upvoteId, setUpvoteId] = useState([]);
  const link = storyUrl || url || "";

  const isIdStored = store => {
    let arr = localStorage.getItem(store);
    arr = arr ? arr.split(",") : [];
    return arr.includes(id);
  };
  useEffect(() => {
    setHiddenId(isIdStored("hiddenRowIds"));
    setUpvoteId(isIdStored("upvotedRowIds"));
  });

  const createdAgo = () => {
    let current = new Date();
    let old = created && new Date(created.substring(0, created.length - 1));
    var diff = Math.abs(current - old) / 1000;
    var day = Math.floor(diff / 86400);
    diff -= day * 86400;
    var hour = Math.floor(diff / 3600) % 24;
    const str = day > 0 ? `${day} days ago` : `${hour} hours ago`;
    alert("ster");
    return str;
  };

  const setStorage = row => {
    let idArray = localStorage.getItem(row);
    idArray = idArray ? idArray.split(",") : [];
    idArray.push(id);
    localStorage.setItem(row, idArray.toString());
  };
  const hideRow = () => {
    setStorage("hiddenRowIds");
    setHiddenId(true);
  };
  const upvoteRow = () => {
    setStorage("upvotedRowIds");
    setUpvoteId(true);
  };
  return hiddenId ? (
    <></>
  ) : (
    <div className="rowcontainer">
      <div className="numbers">{comments || 0}</div>
      <div className="numbers">
        <span>{upvoteId ? upvote+1: upvote}</span>
      </div>
      <div className={`upvote cursor ${upvoteId ? "upvoted": ""}`} onClick={upvoteRow}>
        &#9650;
      </div>

      <div className="titleContainer">
        <div>
          {title || storyTitle || text || ""}
          <span className="url">
            {link &&
              `(${link &&
                link
                  .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
                  .split("/")[0]})`}
          </span>
        </div>

        <div className="author">{`by ${author}`}</div>
        <div className="url">{createdAgo}</div>
        <button className="hide" onClick={hideRow}>
          [ hide ]
        </button>
      </div>
    </div>
  );
};
export default RowData;
