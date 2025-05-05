
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, fetchUser, updateUser } from '../../redux/slices/adminSlice'
import { useNavigate } from 'react-router-dom'

export const UserManageMent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {users,loading,error} = useSelector((state)=> state.admin)
     const {user} = useSelector((state)=>state.auth)


    useEffect(()=>{
        dispatch(fetchUser())

    },[dispatch])


    useEffect(()=>{
        if(!user && user.role !=="admin"){
            navigate("/")
        }
    },[user,navigate])


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer"
    })

   
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData))
        setFormData({

            name: "",
            email: "",
            password: "",
            role: "customer"

        })

    }

    const handleRolechange = ( name ,email,id, role)=> {
        dispatch(updateUser({ name, email, role, id })); 
     
    }
    const handleDeleteUser =(userId)=> {
        if(window.confirm("Are you sure you want to delete  this user")){
            dispatch(deleteUser(userId))
        
        }

    }
    if(loading) return <p>loading ...</p>
    if(error) return <p>{error}</p>


    return (
        <div className="max-w-7xl p-6 mx-auto">

            <div className="p-4">
                <h2 className='text-2xl font-medium'>User Management</h2>
            </div>

            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <h3 className='font-semibold mb-4'>Add New User</h3>

                    <div className='mb-3'>
                        <label className=''>Name</label>
                        <input
                            name='name'
                            type='text'
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className='border py-2 px-3 w-full rounded' placeholder='Enter the Name' />
                    </div>
                    <div className='mb-3'>
                        <label className=''>Email</label>
                        <input
                            name='email'
                            type='email'
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className='border py-2 px-3 w-full rounded' placeholder='Enter the Email' />
                    </div>
                    <div className='mb-3'>
                        <label className=''>Password</label>
                        <input
                            name='password'
                            type='password'
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className='border py-2 px-3 w-full rounded' placeholder='Enter the Password' />
                    </div>
                    <div className='mb-3'>
                        <label className=''>Role</label>
                        <select
                            name='role'
                            className='border py-2 px-3 w-full rounded'
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}

                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="bg-pink-500 hover:bg-pink-300 text-white py-2 px-4 rounded">
                        Add User
                    </button>


                </form>



            </div>

            <div className=" overflow-x-auto max-w-full mt-4">

                <table className=' shadow-lg min-w-full rounded-lg '>
                    <thead className='bg-slate-200 text-left rounded-lg'>
                        <tr className=''>
                            <th className='px-3 py-2'>Name</th>
                            <th className='px-3 py-2'>Email</th>
                            <th className='px-3 py-2'>Role</th>
                            <th className='px-3 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users && users.map((user) => (
                            <tr className='border ' key={user._id}>
                                <td className='p-2'> {user.name}</td>
                                <td className='p-2'> {user.email}</td>
                                <td >
                                    <select 
                                    value={user.role}
                                    onChange={(e)=>handleRolechange(user.name,user.email, user._id,e.target.value,)}
                                    className='border p-2 rounded' name='role' >

                                        <option value='customer'>Customer</option>
                                        <option value='admin'>Admin</option>
                                    </select>
                                </td>
                                 <td className='p-2'>

                                    <button onClick={(e)=>handleDeleteUser(user._id)} className='bg-red-400 p-2 rounded hover:bg-red-200'>
                                        Delete
                                    </button>
                                 </td>

                            </tr> 
                            
                        ))}


                    </tbody>
                </table>


            </div>





        </div>
    )
}
