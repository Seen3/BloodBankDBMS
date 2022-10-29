import { useLocation } from 'react-router-dom';
import React, { useState } from 'react'
import Axios from 'axios'
export default function Disp() {
    const location = useLocation();
    let fname = location.state.data.username;
    let id = location.state.data.id;
    let num = location.state.data.phone;
    let type = location.state.data.type;
    let boxes = {
        backgroundImage: 'linear-gradient(to right, rgba(255,0,255,0.5), rgba(255,255,0,0.4))',
        borderRadius: '3em',
        width: '50%',
        height: '50vh',
        margin: '3em',
        textAlign: 'center   ',
        fontFamily: 'Monospace',
        fontSize: '1.5em',
    };
    let boxButton = {
        width: '4vw',
        backgroundColor: '#900C3F',
        color: '#FF5733 ',
        padding: '5px',
        borderRadius: '2em',
    }
    const [newfname, set_username] = useState('');
    const [newnumber, set_number] = useState('');
    const [newdob, set_dob] = useState('');
    const [newtype, set_type] = useState('');

    const [appdate, set_appdate] = useState('');
    const [apptime, set_apptime] = useState('');
    const [appzip, set_appzip] = useState('');

    const updateinfo = (props) => {
        Axios.post("http://localhost:3001/api/updateinfo", { id: id, username: newfname, phone: newnumber, dob: newdob, type: newtype });
        alert("Information Changed, Please Log in again.")
    }
    const BookAppt= (props) => {
        Axios.post("http://localhost:3001/api/bookappt", {id: id, date: appdate, time: apptime, zipcode: appzip});
        alert("Appointment Added, Please visit the hospital on the chosen slot")
    }
    const CheckStock=(props)=>{
        Axios.post("http://localhost:3001/api/checkStock",{type:type}).then((resp)=>{
        let str="";
        for (let i=0;i<resp.data.length;i++)
        {
            str+=`We have ${resp.data[i].qty} of ${resp.data[i].type} \n`;
        }
        alert(str);
        });
    }
    const GetAppStat=(props)=>{
        Axios.post("http://localhost:3001/api/getappstat",{id:id}).then((resp)=>{
            if (resp.data.length===0)
            {
                alert("You have no appointments scheduled");
            }
            else{
                let S=``;
                for (let i=0;i<resp.data.length;i++)
                {
                    let st=`Your appointment on ${resp.data[i].date.slice(0,-14)} at ${resp.data[i].time} in ${resp.data[i].zipcode}`;
                    if (resp.data[i].approved===1)
                    {
                        st+=` is approved.`;
                    }
                    else if(resp.data[i].approved===-1){
                        st+=` was not available.`;
                    }
                    else{
                        st+=' is being processed';
                    }
                    st+=`\n`;
                    S+=st;
                }
                alert(S);
            }
        })
    };
    return (
        <div style={{ display: 'flex' }}>
            <h1 style={{ position: 'absolute' }}>Welcome {fname}</h1>
            <h1 style={{ position: 'absolute', right: '10px' }}>Contact you at {num}</h1>
            <h1 style={{ position: 'absolute', right: '950px' }}>{type}</h1>
            <div style={boxes}><p>Change your information</p>
                <p>Did you enter something incorrect?
                    <br />
                    Did you change your number, or blood group?
                    <br />
                    Worry not, change your details here.
                </p>
                <label>Name:
                    <input type="text" onChange={(e) => {
                        set_username(e.target.value);
                    }} />
                </label>
                <br />
                <label>Number:
                    <input type="tel" onChange={(e) => {
                        set_number(e.target.value);
                    }} />
                </label><br />
                <label>DOB:
                    <input type="date" onChange={(e) => {
                        set_dob(e.target.value);
                    }} /><br />
                    <label>Type:
                        <select id="type_blood" onChange={(e) => {
                            set_type(e.target.value);
                        }}>
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="AB+">AB+</option>
                            <option value="O+">O+</option>
                            <option value="A-">A-</option>
                            <option value="B-">B-</option>
                            <option value="AB-">AB-</option>
                            <option value="O-">O-</option>
                        </select>
                    </label>
                </label><br />
                <button style={boxButton} onClick={updateinfo}>YES</button></div>
            <div style={boxes}><p>Donate Blood?</p>
                <p>Your blood might save someone's life
                    <br />
                    <label>Date:
                    <input type="date" onChange={(e) => {
                        set_appdate(e.target.value);
                    }} /></label>
                    
                    <br />
                    <label>Time:
                    <select onChange={(e) => {
                        set_apptime(e.target.value);
                    }} >
                        <option value="morning">9:00-12:00</option>
                        <option value="noon">13:00-15:00</option>
                        <option value="evening">16:00-19:00</option>
                        </select></label>
                    <br />
                    <label>Zipcode:
                    <input type="number" onChange={(e) => {
                        set_appzip(e.target.value);
                    }} /></label>
                </p>
                <button style={boxButton} onClick={BookAppt}>YES</button></div>
            <div style={boxes}><p>Need Blood?</p>
                <button style={boxButton} onClick={CheckStock}>YES</button></div>
                <div style={boxes}>
                    <p>Check Appointment status?</p>
                    <button style={boxButton} onClick={GetAppStat}>CHECK</button>
                </div>
        </div>
        
    )
}