import ProjectsList from '../../components/ProjectsList';
import {useCollection} from '../../hooks/useCollection'
import ProjectFilter from './ProjectFilter';
import {useState} from 'react'
import {useAuthContext} from '../../hooks/useAuthContext'


function Dashboard() {
  const {documents, error} = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')
  const {user} = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    switch(currentFilter) {
      case "all":
        return true
      case "mine": 
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if(user.uid == u.id){
            assignedToMe = true
          }
        })
        return assignedToMe
      case "development":
      case "design":
      case "sales":
      case "marketing":
        console.log(document.category, currentFilter);
        return document.category === currentFilter
      default: 
        return true
    }
  }) : null

  return (
    <div className="grid relative top-24 mb-52">
      <h2 className="text-3xl font-bold text-left ml-8 text-gray-700">All Projects</h2>
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
      {error && <p>{error}</p> }
      {projects && <ProjectsList projects={projects}/>}
    </div>
  )
}

export default Dashboard;
