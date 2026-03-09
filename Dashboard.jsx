import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard(){
    const[user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        fetchProfile();

    }, []);


    const fetchProfile = async ()=> {
        try{
            const res = await API.get("/profile");
            setUser(res.data)
        }
        catch(err){
            navigate("/login")
        }
    }

    const logout = async()=>{
        const token = localStorage.getItem("token");

        await API.post("/logout", {},{
            headers : {Authorization: `Bearer ${token}`}
        })

        localStorage.removeItem("token");
        navigate("/login");
    }
    return(
        <div>
            <h2>Dashboard</h2>
            <h3>Welcome {user.username}</h3>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;