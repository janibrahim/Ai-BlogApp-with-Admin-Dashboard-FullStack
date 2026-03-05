import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
    }

    return (
        <div>
            {/* Top Menubar */}
            <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
                <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={() => { navigate('/') }} />
                <button className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer' onClick={logout}>Logout</button>
            </div>
            {/* Side MenuBar */}
            <div className='flex h-[cal(100vh-70px)]'>
                sideBar
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout