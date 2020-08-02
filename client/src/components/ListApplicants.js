import React, {useState} from "react";
import Applicant from "./Applicant"

export default function ListApplicants(props) {
const [searchTerm, setSearchTerm] = useState("")
    return (
        <div style ={{border:"1px solid blue", padding: "5px", margin:"5px"}}>
        <h2>List Applicants</h2>
        <input placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
        <button onClick={()=>setSearchTerm("")}>Clear</button>

        {props.applicants.map((a)=> <Applicant key={a.licenceNumber} applicant={a} />)}
        </div>    )
}