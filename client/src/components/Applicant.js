import React from "react";

export default function Applicant(props) {

    let expiry = new Date(props.applicant.expiry.year +5, props.applicant.expiry.month, props.applicant.expiry.day)

    return (
        <div style={{ border: "2px solid pink", padding: "5px", margin: "5px" }}>
            <p><strong>Name: </strong> {props.applicant.name}</p>
            <p><strong>Licence Number: </strong> {props.applicant.licenceNumber}</p>
            <p><strong>Qualifications: </strong></p>
            <ul>{props.applicant.qualifications.map((q) => <li key={q}>{q}</li>)}</ul>
            <p><strong>Expiry: </strong> {expiry.toDateString()}</p>
        </div>

    )
}