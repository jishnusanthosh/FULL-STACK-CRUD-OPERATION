import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function UpdateUser() {
  const { id } = useParams()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [age, setAge] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3000/getUser/' + id)
      .then((result) => {
        setName(result.data.name),
          setAge(result.data.age),
          setEmail(result.data.email)
      })
      .catch((err) => console.log(err))
  }, [id])

  const Update=(e)=>{
    e.preventDefault();
    axios.put('http://localhost:3000/updateUser/'+id,{name,email,age})
    .then(result=>{
      console.log(result)
      navigate('/')
  
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <br />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter age"
              className="form-control"
              value={age}
              onChange={(e)=>setAge(e.target.value)}
            />
            <br />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser
