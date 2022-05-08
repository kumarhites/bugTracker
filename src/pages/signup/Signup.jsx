import {Link} from "react-router-dom";
import {useState} from 'react'
import { useSignup } from "../../hooks/useSignup";


export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const { signup, isPending, error } = useSignup()
    
    const handleSubmit = (e) => {
      e.preventDefault()
      signup(email, password, displayName, thumbnail)
    }
  
    const handleFileChange = (e) => {
      setThumbnail(null)
      let selected = e.target.files[0]
      console.log(selected)
  
      if (!selected) {
        setThumbnailError('Please select a file')
        return
      }
      if (!selected.type.includes('image')) {
        setThumbnailError('Selected file must be an image')
        return
      }
      if (selected.size > 100000) {
        setThumbnailError('Image file size must be less than 100kb')
        return
      }
      
      setThumbnailError(null)
      setThumbnail(selected)
      console.log('thumbnail updated')
    }

  return (
    <div className="grid place-items-center h-screen pt-5">
      <div className="flex card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
              <form onSubmit={handleSubmit}>
                  <div className="mb-2 flex flex-col">
                      <h1 className="font-bold text-3xl text-left">Sign Up</h1>
                      <p className="text-muted text-left">or <Link to="/login" className="underline decoration-solid decoration-violet-500">Log In</Link></p>

                  </div>
                  <div className="form-control w-full max-w-xs">
                      <label className="label">
                          <span className="label-text font-semibold">Display name</span>
                      </label>
                      <input type="text" required placeholder="Ex: John Doe" className="input input-bordered w-full max-w-xs" onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
                  </div>
                  <div className="form-control w-full max-w-xs mt-2">
                      <label className="label">
                          <span className="label-text font-semibold">Email</span>
                      </label>
                      <input type="email" required placeholder="mail@gmail.com" className="input input-bordered w-full max-w-xs" onChange={(e) => setEmail(e.target.value)} value={email}/>
                  </div>
                  <div className="form-control w-full max-w-xs mt-2 mb-2">
                      <label className="label">
                          <span className="label-text font-semibold">Password</span>
                      </label>
                      <input type="password" required placeholder="Enter your password" className="input input-bordered w-full max-w-xs" onChange={(e) => setPassword(e.target.value)} value={password} />
                  </div>
                  <div className="form-control w-full max-w-xs mt-2 mb-2">
                      <label className="label">
                          <span className="label-text font-semibold">Profile picture</span>
                      </label>
                      <input type="file" placeholder="Enter your password"
                          className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-violet-50 file:text-violet-700
                          hover:file:bg-violet-100" 
                          onChange={handleFileChange}
                          />
                  </div>
                  {!isPending && <button className="btn btn-primary w-full mt-2">Sign Up</button>}
                  {isPending && <button className="btn btn-primary w-full mt-2" disabled>Loading...</button>}
                  {thumbnailError && <div className="text-red-500 font-semibold mt-2">{thumbnailError}</div> }
                  {error && <div className="text-red-500 font-semibold mt-2">{error}</div>}
              </form>
          </div>
      </div>
    </div>

  )
}

