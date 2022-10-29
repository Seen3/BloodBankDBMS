const express=require('express')
const mysql=require('mysql')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')

const db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'password',
    database: 'BloodDB',
})
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/api/signup',(req,res)=>{
    const uName=req.body.username;
    const pass=req.body.password;
    const phone=req.body.phone;
    const dob=req.body.dob;
    const blood=req.body.type;
    const signupQ = "INSERT INTO login_details (username, password,phone,dob,type) VALUES (?,?,?,?,?)"
    db.query(signupQ,[uName,pass,phone,dob,blood],(err,result)=>{
        
    })
})
app.post('/api/admin/getUsers',(req,res)=>{
    let getUsersQ=`SELECT * from login_details where 1=?`
    db.query(getUsersQ,[req.body.id],(err,result)=>{
        //console.log(err,res);
        res.send(result);
    })
})
app.post('/api/admin/deleteUser',(req,res)=>{
    let deleteQ=`DELETE from login_details WHERE id=?`;
    db.query(deleteQ,[req.body.id],(err,result)=>{
        res.send(result);
    })
})
app.post('/api/admin/confevent',(req,res)=>{
    let confQ=`UPDATE appointments set approved = ? where idappointments = ?`;
    let val=req.body.val;
    let id=req.body.id;
    //console.log("Query:",confQ,req.body.val,req.body.id);
    db.query(confQ,[val,id],(err,result)=>{
        //console.log(err,result)
        res.send(result);
    })
});
app.post('/api/admin/unsafeIllogicalQuery/',(req,res)=>{
    let QQQ=req.body.query;
    db.query(QQQ,(err,result)=>{
        console.log(err);
        res.send(result);
    })
});
app.post('/api/admin/denyevent',(req,res)=>{
    let denyQ=`UPDATE appointments set approved = ? where idappointments = ?`;
    let val=req.body.val;
    let id=req.body.id;
    db.query(denyQ,[val,id],(err,result)=>{
        //console.log(err,result)
        res.send(result);
    })
});
app.post('/api/admin/getApp',(req,res)=>{
    const adminQApp=`Select * from appointments where 1=?`;
    db.query(adminQApp,[1],(err,resp)=>{
        res.send(resp);
    })
})
app.post('/api/signin',(req,res)=>{
    let uName=req.body.username;
    uName=uName.replace(/[^a-zA-Z0-9]/g, ''); //prevent injections
    const pass=req.body.password;
    const checkQ=`SELECT * FROM login_details WHERE username=? and password=?`;
    db.query(checkQ,[uName,pass],(err,result)=>{
        res.send(result);
    })
})
app.post('/api/updateinfo',(req,res)=>{
    const id=req.body.id;
    const uName=req.body.username;
    const phone=req.body.phone;
    const dob=req.body.dob;
    const blood=req.body.type;
    const updateQ=`UPDATE login_details set username=?, phone=?, dob=?, type=? WHERE id = ?`;
    db.query(updateQ,[uName,phone,dob,blood,id],(err,res)=>{
    })
})

app.post('/api/bookappt',(req,res)=>{
    const id=req.body.id;
    const date=req.body.date;
    const time=req.body.time;
    const zip=req.body.zipcode;
    const addApptQ=`INSERT INTO appointments (date,time,zipcode,id) VALUES(?,?,?,?)`
    db.query(addApptQ,[date,time,zip,id],(err,req)=>{
    })
})

app.post('/api/getappstat',(req,res)=>{
    let id=req.body.id;
    let appQ=`Select * from appointments where id=?`;
    db.query(appQ,[id],(err,resp)=>{
        if (!err){
            res.send(resp);
        }
        else{
            console.log(err);
        }
    })
})

app.post('/api/checkStock',(req,res)=>{
    let type=req.body.type;
    let rh=type.charAt(type.length-1);
    type=type.slice(0,-1);
    let stockQ;
    switch(rh)
    {
        case '-':
            switch(type){
                case 'AB':
                    stockQ="Select type,qty from storage where type=? or type=? or type=? or type=?";
                    db.query(stockQ,['A-','AB-','B-','O-'],(err,resp)=>{
                        res.send(resp);
                    })
                    break;
                case 'A':
                    stockQ="Select type,qty from storage where type=? or type=?";
                    db.query(stockQ,['O-','A-'],(err,resp)=>{
                        res.send(resp);
                    })
                    break;
                case 'B':
                    stockQ="Select type,qty from storage where type=? or type=?";
                    db.query(stockQ,['O-','B-'],(err,resp)=>{
                        res.send(resp);
                    })
                    break;
                case 'O':
                    stockQ="Select type,qty from storage where type=?";
                    db.query(stockQ,['O-'],(err,resp)=>{
                        res.send(resp);
                    })
                    break;
            }
            break;

        case '+':
            switch(type){
                case 'AB':
                    stockQ="Select type,qty from storage where type=? or type=? or type=? or type=? or type=? or type=? or type=? or type=?";
                    db.query(stockQ,['A-','AB-','B-','O-','A+','AB+','B+','O+'],(err,resp)=>{
                        res.send(resp);
                    })
                    break;
                case 'A':
                    stockQ="Select type,qty from storage where type=? or type=? or type=? or type=?";
                    db.query(stockQ,['A-','O-','A+','O+'],(err,resp)=>{
                        res.send(resp);
                    })
                    break;
                case 'B':
                    stockQ="Select type,qty from storage where type=? or type=? or type=? or type=?";
                    db.query(stockQ,['B-','O-','B+','O+'],(err,resp)=>{
                        res.send(resp);
                    })
                    break;
                case 'O':
                    stockQ="Select type,qty from storage where type=? or type=?";
                    db.query(stockQ,['O-','O+'],(err,resp)=>{
                        res.send(resp);
                    })
                    break;
            }
            break;
    }
})
app.listen(3001,()=>{
    console.log("Running on 3001");
})