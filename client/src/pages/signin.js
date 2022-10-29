import "./../styles/signup.css"
import Axios from 'axios'
import md5 from 'md5'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Signin() {
    const [username, set_username] = useState('')
    const [password, set_password] = useState('')
    const navigate = useNavigate();
    const check = (props) => {
        Axios.post("http://localhost:3001/api/signin", { username: username, password: md5(password) }).then((response) => {
            if (response.data.length === 0) {
                alert("Invalid Login")
            }
            else {
                let data = response.data[0];
                console.log(data);
                if (data.id !== 1) { navigate('/main', { state: { data: data } }); }
                else {
                    navigate('/admin', { state: { data: data } });
                }
            }
        })
    }
    return (
        <div className="big">
            <p>Sign In</p>
            <div className="loginform">
                <h1>Sarkari Blood Bank</h1>
                <p>Blood for the blood God</p>
                <input placeholder="Username" type="text" name="username" onChange={(e) => {
                    set_username(e.target.value)
                }} />
                <input placeholder="Password" type="password" name="loginpass" onChange={(e) => {
                    set_password(e.target.value)
                }} />
                <button onClick={check}>Log In</button>
            </div>


            Photo by <a href="https://unsplash.com/@lanirudhreddy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">ANIRUDH</a> on <a href="https://unsplash.com/s/photos/blood-cells?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            <br />
            <a href="https://www.flaticon.com/free-icons/cell" title="cell icons">Cell icons created by Eucalyp - Flaticon</a>
        </div>
    )
}