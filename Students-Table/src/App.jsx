import {useState,useEffect} from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";
import {exportExcel} from "./utils/excelExport.js";
import "./App.css";

function App(){

const [students,setStudents]=useState([])
const [editingStudent,setEditingStudent]=useState(null)
const [loading,setLoading]=useState(true)
const [search,setSearch]=useState("")

useEffect(()=>{

setTimeout(()=>{

setStudents([
{id:1,name:"John",email:"john@mail.com",age:21},
{id:2,name:"Emma",email:"emma@mail.com",age:22}
])

setLoading(false)

},1000)

},[])

const addStudent = (student) => {
  const newStudent = {
    ...student,
    id: Date.now()
  }

  setStudents([...students, newStudent])
}

const updateStudent=(student)=>{
setStudents(students.map(s=>s.id===student.id?student:s))
setEditingStudent(null)
}

const deleteStudent=(id)=>{
if(window.confirm("Delete this student?")){
setStudents(students.filter(s=>s.id!==id))
}
}

const filteredStudents=students.filter(s=>
s.name.toLowerCase().includes(search.toLowerCase())
)

if(loading){
return <h2>Loading...</h2>
}

return(

<div className="container">

<h2>Students Table</h2>

<StudentForm
addStudent={addStudent}
updateStudent={updateStudent}
editingStudent={editingStudent}
/>

<div className="actions">

<input
placeholder="Search student"
onChange={(e)=>setSearch(e.target.value)}
/>

<button onClick={()=>exportExcel(students)}>
Download Full Excel
</button>

<button onClick={()=>exportExcel(filteredStudents)}>
Download Filtered Excel
</button>

</div>

<StudentTable
students={filteredStudents}
onEdit={setEditingStudent}
onDelete={deleteStudent}
/>

</div>

)

}

export default App