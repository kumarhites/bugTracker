const filterList = ["all", "mine", "development", "design", "marketing", "sales"]

function ProjectFilter({currentFilter, changeFilter}) {

    const handleClick = (newFilter) => {
        console.log(newFilter);
        changeFilter(newFilter)
    } 

  return (
      <div className="projectfilter">
          <nav>
              <span className="font-bold">Filter by: </span>
              {filterList.map((f) => (<>
                  <button className={currentFilter === f ? 'btn btn-active btn-ghost btn-sm' : 'btn btn-ghost btn-sm m-1'} key={f} onClick={() => handleClick(f)}>{f}</button> 
                  </>
              ))}
          </nav>
      </div>
  )
}

export default ProjectFilter;
