import {useDocument} from '../../hooks/useDocument'
import {useParams} from 'react-router-dom' // to get the id parameter from the url
import Summary from './Summary'
import Comments from './Comments'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function ViewProject() {
const {id} = useParams()
const {document, error} = useDocument('projects', id)

if(error){
return <div className="mt-32 error font-bold text-xl text-red-700 card">{error}</div>
}
if(!document){
return (
<div className="mt-32">
  <p>Loading...</p>
  <progress className="progress progress-info w-40"></progress>
</div>
)
}
return (
<div className="flex flex-wrap gap-3 p-20">
  <Summary project={document} />
  <div className="bg-red-100 flex-1 rounded-lg">
    <Comments project={document} />
  </div>

  {/* comments table */}
  <div class="flex flex-wrap md:w-full">
      {document.comment.length > 0 && document.comment.map(comments => (
        <div class="card lg:w-96 bg-base-100 shadow-xl m-3 md:w-full">
        <div class="card-body">
        <div class="avatar items-center">
          <div class="w-10 rounded-full">
            <img src={comments.photoURL} />
          </div>
          <span className="ml-3 font-bold">{comments.displayName}</span>
          <p className="text-xs font-semibold text-right">{formatDistanceToNow(comments.createdAt.toDate(), {addSuffix: true})}</p>
          </div>
          <div class="card-actions justify-end">
            <p className="ml-11 text-left">{comments.content}</p>
          </div>
        </div>
      </div>
      ))}
  </div>
  {/* end of comments table */}
</div>
)
}

export default ViewProject;

