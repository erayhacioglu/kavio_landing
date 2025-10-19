import React from "react";
import "./card_features.scss";

const CardFeature1 = () => {
  return (
    <div className="container">
      <div className="card_feature">
        <div className="card_feature_picture">
            SOL
        </div>
        <div className="card_feature_content">
          <h2 className="card_feature_slogan">
            Efficient Inventory Management at Your Fingertips
          </h2>
          <p className="card_feature_description">
            Keep track of your stock levels with accuracy and ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFeature1;
