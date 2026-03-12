import { useState, useEffect } from "react"

function StudentForm({addStudent,updateStudent,editingStudent}){

const [form,setForm]=useState({name:"",email:"",age:""})

useEffect(()=>{
if(editingStudent){
setForm(editingStudent)
}
},[editingStudent])

const validateEmail=(email)=>{
return /\S+@\S+\.\S+/.test(email)
}

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit=(e)=>{
e.preventDefault()

if(!form.name || !form.email || !form.age){
alert("All fields required")
return
}

if(!validateEmail(form.email)){
alert("Invalid email")
return
}

if(editingStudent){
updateStudent(form)
}else{
addStudent(form)
}

setForm({name:"",email:"",age:""})
}

return(
<form onSubmit={handleSubmit} className="form">

<input
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
/>

<input
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
/>

<input
name="age"
type="number"
placeholder="Age"
value={form.age}
onChange={handleChange}
/>

<button type="submit">
{editingStudent?"Update":"Add Student"}
</button>

</form>
)
}

export default StudentForm