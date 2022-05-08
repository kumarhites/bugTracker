// import './OnlineUsers.css'

import {useCollection} from '../hooks/useCollection'

import React from "react";
import Avatar from './Avatar';

function OnlineUsers() {

    const {error, documents} = useCollection('users')
    
  return (<>
    <footer class="footer items-center p-4 bg-violet-500 text-neutral-content bottom-0 fixed">
  <div class="items-center grid-flow-col"> 
  <p className="text-ellipsis">All users</p>    
      {error && <div className="error">{error}</div> }
      {documents && documents.map(user => (<div className="flex items-center pl-3">
      {user.online && <label tabIndex="0" className="btn btn-ghost btn-circle avatar online" key={user.uid}>
        <div className="w-9 rounded-full">
         <Avatar src={user.photoURL}/>
        </div>
      </label>}
        {!user.online && <label tabIndex="0" className="btn btn-ghost btn-circle avatar offline">
        <div className="w-9 rounded-full ">
         <Avatar src={user.photoURL}/>
        </div>
      </label>}
      </div>))}
  </div> 
</footer>
  </>);
}

export default OnlineUsers;
