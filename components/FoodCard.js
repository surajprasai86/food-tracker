import Image from "next/image";
import { useState } from "react";

function FoodCard({data}) {
  return (
    <div className="card" style={{ width: "32rem", margin: "14px" }}>
      <Image
        width={286}
        height={180}
        className="card-img-top"
        src="/pumpkin.jpg"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{data.id + ": " + data.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="btn btn-primary">
          View Details
        </a>
      </div>
    </div>
  );
}

export default FoodCard;


