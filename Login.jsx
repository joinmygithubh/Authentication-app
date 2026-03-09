import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError]= useState("");
    const[loading, setLoading] =useState(false);

    const navigate = useNavigate();

    const handleLogin = async(e) =>{
        e.prevantDefault();

        if(!username || password.length <6 ){
            setError("Invalid input");
            return;
        }

        try {
            setLoading(true);
            const res = await API.post("/login", {username, password});

            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");

        } catch (err) {
            setError("Invalid credentials")
        }

        setLoading(false);
    }

    return(
        <div style={{}}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input 
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={(e)=> setPassword(e.target.value)}
                />

                <button type="submit">
                    {loading ? "Loading...": "Login"}
                </button>
                <p>{error}</p>
            </form>
        </div>
    )
}

export default Login;
