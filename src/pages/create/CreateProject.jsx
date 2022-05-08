import {useEffect, useState} from 'react'
import Select from 'react-select'
import {useCollection} from '../../hooks/useCollection'
import {timestamp} from '../../firebase/config'
import {useAuthContext} from '../../hooks/useAuthContext' 
import {useFirestore} from '../../hooks/useFirestore'
import {useNavigate} from 'react-router-dom'

function CreateProject() {
  //form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUser, setAssignedUser] = useState([])
  const {documents} = useCollection('users')
  const [users, setUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const {user} = useAuthContext()
  const {addDocument, response} = useFirestore('projects')
  let navigate = useNavigate();

  useEffect(()=>{
    if(documents){
      const options = documents.map(user => {
        return {
          value: user, 
          label: user.displayName,
        }
      })
      setUsers(options)
    }
  },[documents])

  const categories = [
    {value: 'development', label: 'Development'},
    {value: 'design', label: 'Design'},
    {value: 'sales', label: 'Sales'},
    {value: 'marketing', label: 'Marketing'},
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    if(!category){
      setFormError('Please select a project category')
      return
    }
    if(assignedUser.length < 1){
      setFormError('Please select assigned users')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    }

    const assignedUsersList = assignedUser.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })


    const project = {
      name,
      details,
      category: category.value, 
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comment:[],
      createdBy,
      assignedUsersList,
    }



    await addDocument(project)
    if(!response.error){
      navigate("/");
    } 
  }


return (
<div className="grid place-items-center mt-24 mb-24">
  <div className="flex card lg:w-[500px] bg-base-100 shadow-xl">
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 flex flex-col">
          <h1 className="font-bold text-4xl text-left mb-3">New Project</h1>
          <p className="text-muted text-left text-slate-700">Details of your new project.</p>
        </div>
        <div className="form-control w-full max-w-md">
          <label className="label">
            <span className="label-text font-semibold">Project Name</span>
          </label>
          <input type="text" placeholder="Project name" className="input input-bordered w-full max-w-md" required
            onChange={(e)=> setName(e.target.value)} value={name}/>
        </div>
        <div className="form-control w-full max-w-md mt-5 mb-5">
          <label className="label">
            <span className="label-text font-semibold">Project details</span>
          </label>
          <textarea type="text" placeholder="Project details" className="textarea textarea-bordered w-full max-w-md" required
            onChange={(e)=> setDetails(e.target.value)} value={details}/>
        </div>
        <div className="form-control w-full max-w-md mt-5 mb-5">
          <label className="label">
            <span className="label-text font-semibold">Assign to</span>
          </label>
          <Select options={users} onChange={(option) => setAssignedUser(option)} value={assignedUser} isMulti/>
        </div>
        <div className="form-control w-full max-w-md mt-5 mb-5 ">
          <label className="label">
            <span className="label-text font-semibold">Project category</span>
          </label>
          <Select options={categories} onChange={(option) => setCategory(option)} value={category}/>
        </div>
        <div className="form-control w-full max-w-md mt-5 mb-5">
          <label className="label">
            <span className="label-text font-semibold">Due date</span>
          </label>
          <input type="date" className="input input-bordered w-full max-w-md" required
            onChange={(e)=> setDueDate(e.target.value)} value={dueDate}/>
        </div>
       <button className="btn btn-primary w-full">Create project</button>
       {formError && 
          <div className="badge badge-error gap-2 mt-3 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokewidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            {formError}
          </div>
        }
      </form>
    </div>
  </div>
</div>
  )
}

export default CreateProject;
