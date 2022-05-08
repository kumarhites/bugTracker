import React from "react";
import Avatar from '../../components/Avatar'
import {useFirestore} from '../../hooks/useFirestore'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useNavigate} from 'react-router-dom'


function Summary({project}) {
    const {deleteDocument} = useFirestore('projects')
    const {user} = useAuthContext()
    let navigate = useNavigate();

    const handleDelete = (e) => { 
        if(confirm("Are you sure you want to delete this project?")){
            deleteDocument(project.id);
            navigate("/");
        }
    }

    return (
    <div className="bg-slate-400 flex-1 rounded-lg">
        <div class="card min-w-96 text-primary-content">
            <div class="card-body">
                <div class="card-actions justify-end">
                    {user.uid === project.createdBy.id && (
                    <button class="btn btn-square btn-sm" onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>)}
                </div>
                <h1 className="text-sl text-left">{project.id}</h1>
                {/* <p className="text-left text-xs font-bold">Project Name</p> */}
                <h2 class="card-title text-4xl">{project.name}</h2>
                <p className="badge badge-primary mt-3 mb-3">{project.category}</p>
                <span className="text-left text-sm">
                    <Avatar src={project.createdBy.photoURL} /></span>
                <p className="text-left">{project.details}</p>
                <div class="card-actions justify-end items-center pt-16">
                    <p className="text-left font-semibold text-sm">Project due by {project.dueDate.toDate().toDateString()}
                    </p>
                    <div class="avatar-group -space-x-3 items-center">
                        <p className="text-left text-sm font-bold mr-10">Assigned to</p>
                        {project.assignedUsersList.map((user) => (
                        <Avatar src={user.photoURL} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Summary;