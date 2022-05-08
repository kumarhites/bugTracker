import Avatar from "./Avatar";
import {Link} from "react-router-dom"
function ProjectsList({projects}) {

return (
<div className="flex flex-wrap">
    {projects.map((project) => (
    <Link to={`/projects/${project.id}`} className="card w-96 bg-base-100 drop-shadow-md m-4"  key={project.id}>
        <div className="card-body">
            <h2 className="card-title text-xl border-b-2 font-bold">{project.name}</h2>
            <label className="text-xs text-left font-bold text-gray-500">Created By</label>
            <Avatar src={project.createdBy.photoURL} />
            <p className="text-xs text-left font-bold text-gray-500">Due by {project.dueDate.toDate().toDateString()}</p>
            <p className="badge badge-info text-white font-semibold badge-sm">{project.category}</p>
            <p className="text-muted text-left">{project.details}</p>
            <div class="card-actions justify-end avatar-group -space-x-6 items-center">
                <p className="text-xs text-left font-bold text-gray-500">Assigned to</p>
                {project.assignedUsersList.map((user) => (
                    <Avatar src={user.photoURL} />
                ))}
            </div>
        </div>
    </Link>))}
    {projects.length === 0 && (<div>
        <p className="m-10">No projects found</p>
        <p className="m-10 text-blue-700 font-bold"><Link to="/create">Create a new Project</Link></p>    
        </div>)}
</div>
);
}

export default ProjectsList;

