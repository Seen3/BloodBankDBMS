import "./../styles/signup.css"
import Axios from 'axios'
import md5 from 'md5'
import React,{useState} from 'react'

export default function SignUp(){
  const [username,set_username]=useState('')
  const [password,set_password]=useState('')
  const [dateBirth,set_dateBirth]=useState('')
  const [type,set_type]=useState('')
  const [phone,set_phone]=useState('')

  const newAcc=()=>{
    Axios.post("http://localhost:3001/api/signup",{username:username,password:md5(password),phone:phone,dob:dateBirth,type:type});
    alert("Account Created");
  }
  return (
    <div className="big">
      <p>SIGN UP</p>
      <div className="loginform">
        <h1>Join Us</h1>
        <p>We like blood</p>
        <input placeholder="Username" type="text" name="username" onChange={(e)=>{
          set_username(e.target.value)
        }}/>
      <input placeholder="Password" type="password" name="loginpass" onChange={(e)=>{
        set_password(e.target.value)
      }}/>
      <input placeholder='Contact Number' type="tel" name="number" onChange={(e)=>{
        set_phone(e.target.value)
      }}/>
      <label>Blood Type
      <select onChange={(e)=>{
        set_type(e.target.value);
      }}>
      <option value="O+">O+</option>
      <option value="B+">B+</option>
      <option value="A+">A+</option>
      <option value="AB+">AB+</option>
      <option value="O-">O-</option>
      <option value="B-">B-</option>
      <option value="A-">A-</option>
      <option value="AB-">AB-</option>
      
      </select>
      </label>
      <label> Date of Birth
      <input type="date" name="date"  onChange={(e)=>{
          set_dateBirth(e.target.value)
        }}/>
        </label>
      <button onClick={newAcc}>Add Account</button>
      </div>
      Photo by <a href="https://unsplash.com/@lanirudhreddy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">ANIRUDH</a> on <a href="https://unsplash.com/s/photos/blood-cells?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      <br/>
      <a href="https://www.flaticon.com/free-icons/cell" title="cell icons">Cell icons created by Eucalyp - Flaticon</a>
    </div>
  );
}