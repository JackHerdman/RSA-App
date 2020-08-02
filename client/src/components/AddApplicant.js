import React, { useState } from "react";

export default function AddApplicant(props) {

    const [name, setName] = useState("");
    const [qualifications, setQualifications] = useState([]);
    const [expiry, setExpiry] = useState(new Date().toJSON().slice(0, 10));
    const [qualificationOptions, setqualificationOptions] = useState(
        [{ id: 'RSA', description: 'Responsible Service of Alcohol', checked: false },
        { id: 'RCG', description: 'Responsible Conduct of Gambling', checked: false },
        { id: 'PRIV', description: 'Privacy Training', checked: false },
        { id: 'LIC', description: 'Licensee Training', checked: false }
        ]);

    function sendAddApplicantRequest(e) {
        //stops the form from submitting and making a synchronous post request
        //instead uses async using fetch
        e.preventDefault();
        let dateParts = expiry.split('-');
        let a = { name, qualifications, dateParts };

        fetch("http://localhost:4000/api/applicants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(a),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 200) {
                    props.addApplicants(json.applicants);
                    alert(`Success!
                    ${json.applicants.licenceNumber},
                    ${json.applicants.name},
                    ${json.applicants.qualifications}`);
                    setName("");
                    setQualifications([]);
                    setExpiry(new Date().toJSON().slice(0, 10));
                    let resetQualificationOptions = qualificationOptions.map((qo) => {return {...qo, checked:false}});
                    setqualificationOptions(resetQualificationOptions);
                    

    } else {
        alert("There was an error");
    }

})

    }

function addRemoveQualification(event) {
    debugger;
    let updatedQualificationOptions = [];
    let quals = qualifications;
    if (event.target.checked) {
        for (let qo of qualificationOptions) {
            if (qo.id === event.target.value) {
                updatedQualificationOptions.push({ ...qo, checked: true });
            } else {
                updatedQualificationOptions.push({ ...qo });
            }
        }
        setQualifications([...qualifications, event.target.value])
    } else {
        let index = quals.indexOf(event.target.value);
        if (index > -1) {
            quals.splice(index, 1);
            setQualifications(quals)
        }
        for (let qo of qualificationOptions) {
            if (qo.id === event.target.value) {
                updatedQualificationOptions.push({ ...qo, checked: false });
            } else {
                updatedQualificationOptions.push({ ...qo });
            }

        }

    }
    setqualificationOptions(updatedQualificationOptions);
}

return (
    <div>
        <div style={{ border: "1px solid green", padding: "5px", margin: "5px" }}>
            <h2>Add Applicant</h2>
            <div style={{ display: "flex", width: "60%" }}>
                <form>
                    <div>
                        <br></br>
                        <label htmlFor="Name">Please enter the Applicant's name: </label>
                        <input placeholder="EG. John Doe" onChange={(e) => setName(e.target.value)} value={name} />
                        <br></br>
                    </div>
                    <div>
                        <br></br>
                        <label htmlFor="Qualifications">Please enter the all qualifications listed on Applicant's certificate: </label>
                        {qualificationOptions.map((qo) =>
                            <div id="qualscheckbox">
                                <input type="checkbox" value={qo.id} onChange={addRemoveQualification} checked={qo.checked} />
                                <label>{qo.description}</label>
                            </div>
                        )}
                        <br></br>
                    </div>
                    <div>
                        <label htmlFor="expiry">Please date of course completion: </label>
                        <input type="date" onChange={(e) => setExpiry(e.target.value)} value={expiry} />
                    </div>
                    <div>
                        <br></br>
                        <button onClick={sendAddApplicantRequest}>Add Applicant</button>
                        <br></br>
                    </div>
                </form>
            </div>
        </div>
    </div>


)
}