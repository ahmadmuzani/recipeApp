import React from "react";
const CardCompt = (props) => {
    return (
        <div className="col" key={props.key}>
            <div className="card m-2" onClick={props.navigate}>
                <img src={props.image} id='imageCategory' className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title suggest-title">{props.title}</h5>
                </div>
            </div>
        </div>
    )
}
export default CardCompt;