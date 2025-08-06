import React,{useState} from 'react'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'
import { Avatar, AvatarImage } from './ui/avatar'
// import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import UpdateProfileDialog from './UpdateProfileDialog'
import Navbar from './shared/Navbar'


const Profile = () => {
    const [open, setOpen] = useState(false);

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <div>
                <Navbar/>
                <div style={{ display: "flex", flexDirection: "column", height: "40vh" ,padding:"30px",backgroundColor:"#00802b",boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", borderEndEndRadius:"15px",borderEndStartRadius:"15px"}}>
                    <Avatar style={{ height: "200px", width: "200px", objectfit: "cover", backgroundPosition: "center"}}   >
                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                    <h1 className="text-xl font-bold ml-14 mt-4 text-white ">{user?.firstname} {user?.lastname}</h1>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                    <hi>Email : {user?.email}</hi>
                    <hi>PhoneNo : :{user?.phoneNumber}</hi>
                    <hi>{user?.profile?.address}</hi>
                    <Button onClick={() => setOpen(true)}>Edit</Button>
                </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>

            </div>
        </>
    )
}

export default Profile
