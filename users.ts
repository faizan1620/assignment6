const express=require('express');
const fs=require('fs');
const router=express.Router();



var myData = JSON.parse(fs.readFileSync("data.json").toString());



router.get('/',(req,res)=>{ 
  res.send(myData);
});

router.post('/',(req,res)=>{
    var found:number=0;
    const user=req.body;
    for(var i=0;i<myData.length;i++){
        if(myData[i]["UId"]==user.UId){
            res.sendStatus(404);
            found=1;
        }
    } 
    if(found==0){
    myData.push(user);
    const stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send(myData);
    }
});

router.delete('/:id',(req,res)=>{
    const { id } = req.params;
    myData = myData.filter((user)=> user.UId!=id);
    const stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send(myData);
});

router.patch('/:id',(req,res)=>{
    const { id } = req.params;
    

    const user = req.body;
    for(var i=0;i<myData.length;i++){
        if(myData[i]["UId"]==id){
            break;
        }
    } 
   
    myData[i]["First_Name"]=user.First_Name;
    myData[i]["Middle_Name"]=user.Middle_Name;
    myData[i]["Last_Name"]=user.Last_Name;
    myData[i]["Email"]=user.Email;
    myData[i]["Phone_Number"]=user.Phone_Number;
    myData[i]["Role"]=user.Role;
    myData[i]["Address"]=user.Address;

    const stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send("User updated");
  
    
}); 


export default router;