import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-[#FAA613]'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>take<span className='text-[#00802b]'>it</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-7'>
                        {
                            user && user.role === 'owner' ? (
                                <>
                                    <li><Link to="/admin/companies">Home</Link></li>
                                    <li><Link to="/admin/jobs">Products</Link></li>
                                </>
                            ) : !user ? (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/request">Products</Link></li>
                                    <li><Link to="/request">Browse</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/products">Products</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                    <li><Link to="/browse"><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="hover:bg-[#f2f2f2]">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#00802b] hover:bg-[#00805b]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div className='flex flex-col gap-5'>
                                                <h4 className='font-medium'>{user?.firstname} {user?.lastname}</h4>

                                                <p className='text-sm text-muted-foreground'><span className='font-bold text-black'>Address: </span>{user?.profile?.address}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'customer' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>

                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar