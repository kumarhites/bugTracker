import {Link} from "react-router-dom";
import {useLogin} from '../../hooks/useLogin'
import {useState} from 'react'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isPending, error} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }


return (
<div className="grid place-items-center h-[100vh]">
    <div className="flex card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex flex-col">
                    <h1 className="font-bold text-4xl text-left mb-3">Log In</h1>
                    <p className="text-muted text-left text-slate-700">Please log in to your account.</p>

                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-semibold" >Email</span>
                    </label>
                    <input type="text" placeholder="mail@gmail.com" className="input input-bordered w-full max-w-xs" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="form-control w-full max-w-xs mt-5 mb-5">
                    <label className="label">
                        <span className="label-text font-semibold" >Password</span>
                    </label>
                    <input type="password" placeholder="Enter your password"
                        className="input input-bordered w-full max-w-xs" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                </div>
                {!isPending && <button className="btn btn-primary w-full">Log In</button>}
                {isPending && <button className="btn btn-primary w-full" disabled>Loading...</button>}
                {error && <p>{error}</p>}
                <p className="mt-3">Don't have an account? <Link to="/signup" className="underline decoration-solid decoration-violet-500">Sign Up</Link></p>
            </form>
        </div>
    </div>
</div>

)
}

export default Login;