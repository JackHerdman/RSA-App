import React, { useState, useEffect } from 'react';
import AddApplicant from './components/AddApplicant'
import ListApplicants from './components/ListApplicants'
import UpdateApplicant from './components/UpdateApplicant'
import DeleteApplicant from './components/DeleteApplicant'

export default function App() {

  const [applicants, setApplicants] = useState([]);

  function addApplicants(a){
    setApplicants([...applicants, a]);
  }

  useEffect(() => {
    fetch("http://localhost:4000/api/applicants")
    .then((response)=>response.json())
    .then((json)=>setApplicants(json));
  }, []);

  const [view, setView] = useState(0);
  let views = [
    <ListApplicants applicants={applicants} />,
    <AddApplicant addApplicants={addApplicants}/>,
    <UpdateApplicant />,
    <DeleteApplicant />
  ]
  let toggleView = () => setView(view === views.length - 1 ? 0 : view + 1)



  return (
    <div style={{ border: "1px solid black", padding: "5px", margin: "5px" }}>
      <h1>My App</h1>
      <button onClick={toggleView}>Switch View</button>
      {views[view]}
    </div>
  )
}