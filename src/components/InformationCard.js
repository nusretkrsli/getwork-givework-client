import React from "react";

function InformationCard(props) {
    const { title, image } = props;
  return (
    <div>
      <img
         src={image}
        alt=""
        className="homepageimage"
      />
      <h1 className="image_text px-4">{title}</h1> 
    </div>
  );
}

export default InformationCard;
