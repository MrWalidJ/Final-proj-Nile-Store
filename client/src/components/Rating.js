import React from "react";

const Rating = ({ rating, onClick, style }) => {
  return (
    <div>
      {[...Array(5)].map((_,i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <i className="fa-solid fa-star" style={{ fontSize: "15px" }}></i>
          ) : (
            <i className="fa-regular fa-star" style={{ fontSize: "15px" }}></i>
          )}
        </span>
        
      ))}
      
    </div>
  );
};

export default Rating;
