import Axios from 'axios'
import "./../styles/admin.css"
import morb from "../morb.jpg"
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function conf(elem) {
    //console.log('confirm', elem.path[1].id);
    Axios.post("http://localhost:3001/api/admin/confevent", { id: elem.path[1].id, val: 1 }).then((res) => {
        //console.log(res);
        if (res.data.affectedRows == 1) {
            elem.path[1].classList.remove('red');
            elem.path[1].classList.add('green');
            //console.log(elem.path[1].classList);
        }
    })
}
function deny(elem) {
    //console.log('deny', elem.path[1].id);
    Axios.post("http://localhost:3001/api/admin/denyevent", { id: elem.path[1].id, val: -1 }).then((res) => {
        //console.log(res);
        if (res.data.affectedRows == 1) {
            elem.path[1].classList.remove('green');
            elem.path[1].classList.add('red');
            //console.log(elem.path[1].classList);
        }
    })
}

function deleteUser(elem) {
    //console.log(elem.path[1])
    let element=elem.path[1];
    //elem.path[2].removeChild(element);
    let id=element.id;
    //console.log(id);
    Axios.post('http://localhost:3001/api/admin/deleteUser',{id:id}).then((res)=>{
        console.log(res);
    })
}

export default function Admin() {
    const location = useLocation();

    document.body.style.backgroundImage = `url(${morb})`;
    document.body.style.backgroundSize = `cover`;
    let id = location.state.data.id;

    const GetUsers = (props) => {
        Axios.post("http://localhost:3001/api/admin/getUsers", { id: id }).then((res) => {
            let usr = document.getElementById('users_list');
            usr.innerHTML = "";
            let lst = [];
            console.log(res);

            for (let i = 0; i < res.data.length; i++) {
                let newAp = document.createElement('div');
                newAp.classList.add('data');
                newAp.id=res.data[i].id;
                let pp = document.createElement('p');
                pp.innerText = `User:"${res.data[i].username}" Phone Number:"${res.data[i].phone}"`;
                let delbut = document.createElement('button');
                delbut.innerText = "Delete User";
                newAp.appendChild(pp);
                newAp.appendChild(delbut);
                delbut.addEventListener('click', deleteUser)
                if (res.data[i].username != 'User') {
                    lst.push(newAp);
                }
            }
            for (let i = 0; i < lst.length; i++) {
                //console.log(lst[i])
                usr.appendChild(lst[i]);
            }
            //console.log(lst);
        });
    }


    const LoadAppointments = (props) => {
        Axios.post("http://localhost:3001/api/admin/getApp", { id: id }).then((res) => {
            let appt = document.getElementById('appointment_list');
            appt.innerHTML = "";
            let lst = [];
            //console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                let newAp = document.createElement('div');
                newAp.classList.add('data');
                //console.log(res.data);
                console.log(res.data[i].approved)
                if (res.data[i].approved == 1) {
                    newAp.classList.add('green');
                }
                else if (res.data[i].approved == -1) {
                    newAp.classList.add('red');
                }
                let confbut = document.createElement('button');
                confbut.innerHTML = "Confirm";
                confbut.addEventListener('click', conf);
                //console.log(confbut)
                let denybut = document.createElement('button');
                denybut.innerHTML = "Deny";
                denybut.addEventListener('click', deny);
                let pp = document.createElement('p');
                pp.innerText = `date:${res.data[i].date.slice(0, -14)} Time:${res.data[i].time} zip:${res.data[i].zipcode}`;
                newAp.appendChild(pp);
                newAp.appendChild(confbut);
                newAp.appendChild(denybut);
                newAp.id = res.data[i].idappointments
                lst.push(newAp);
            }
            for (let i = 0; i < lst.length; i++) {
                //console.log(lst[i])
                appt.appendChild(lst[i]);
            }
            //console.log(lst);
        });
    }
    const [query, set_query] = useState('');
    function postQuery(props) {
        Axios.post('http://localhost:3001/api/admin/unsafeIllogicalQuery', { query: query }).then((response) => {
            let evilDiv = document.getElementById('query_result');
            //console.log(response.data);
            evilDiv.innerText="";
            for (let i = 0; i < response.data.length; i++) {
                evilDiv.innerText += JSON.stringify(response.data[i])+"\n";
            }
        });
    }
    return (
        <div style={{
        }}>
            <h1>IT'S MORBING TIME</h1>
            <div>
                <p>Manage Appointments</p>
                <button onClick={LoadAppointments}>Get Appointments</button>
                <div id="appointment_list"></div>
                <button onClick={GetUsers}>Get Users</button>
                <div id="users_list"></div>
                <div>
                    <input type="text" placeholder='execute this query' onChange={(e) => {
                        set_query(e.target.value);
                    }}></input>
                    <button onClick={postQuery}>RUN QUERY</button>
                    <div id="query_result"></div>
                </div>
            </div>
        </div>
    )
}