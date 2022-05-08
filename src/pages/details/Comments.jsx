import {useState} from "react";
import {timestamp} from "../../firebase/config"
import {useAuthContext} from "../../hooks/useAuthContext"
import {useFirestore} from "../../hooks/useFirestore"


function Comments({project}) {
const [newComment, setNewComment] = useState('')
const {user} = useAuthContext()
const {updateDocument, response} = useFirestore('projects')

const handleSubmit = async(e) => {
e.preventDefault()

const commentToAdd = {
displayName: user.displayName,
photoURL: user.photoURL,
content: newComment,
createdAt: timestamp.fromDate(new Date()),
id: Math.random()
}
await updateDocument(project.id, {
comment: [...project.comment, commentToAdd]
})
if(!response.error){
setNewComment('')
}
}


return (
<div className="p-20">
    <h1 className="text-4xl font-bold text-left">Comments</h1>
    <form className="mt-3" onSubmit={handleSubmit}>
        <textarea className="form-control textarea w-full h-64" placeholder="Add a new Comment" required
            onChange={(e)=> setNewComment(e.target.value)} value={newComment}></textarea>
        <button className="mt-3 btn btn-primary float-right">Submit</button>
    </form>
</div>
);
}

export default Comments;