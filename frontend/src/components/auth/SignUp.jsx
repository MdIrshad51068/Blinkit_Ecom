import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address:"",
        phoneNumber: "",
        password: "",
        role: "costomer",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("firstname", input.firstname);
        formData.append("lastname", input.lastname);
        formData.append("email", input.email);
        formData.append("address", input.address);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto '>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 '>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label className="mb-3 mt-10">First Name</Label>
                        <Input
                            type="text"
                            value={input.firstname}
                            name="firstname"
                            onChange={changeEventHandler}
                            placeholder="First Name"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="mb-3 mt-5">last Name</Label>
                        <Input
                            type="text"
                            value={input.lastname}
                            name="lastname"
                            onChange={changeEventHandler}
                            placeholder="Last Name"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="mb-3 mt-5">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="mb-3 mt-5">Address</Label>
                        <Input
                            type="text"
                            value={input.address}
                            name="address"
                            onChange={changeEventHandler}
                            placeholder="Enter Address"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="mb-3 mt-5">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="mb-3 mt-5">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-[#00802b]"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button > : <Button type="submit" className="w-full my-4 bg-[#00802b]">Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup