import React from "react";
import "./card_features.scss";

const CardFeature3 = () => {
  return (
    <div className="container">
      <div className="card_feature">
        <div className="card_feature_picture">
            <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDB3cXZhY3VvY3NjNGtwYXd4M2lkeTM0anQ2c3lzZjgxZ2JnZzdjayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cjhEFYxwmcTfX7PGLP/giphy.gif" alt="" className="card_feature_gif"/>
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

export default CardFeature3;
