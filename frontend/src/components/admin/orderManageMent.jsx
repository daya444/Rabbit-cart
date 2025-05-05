import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice'

export const OrderManageMent = () => {

  const { orders,loading,error} = useSelector((state)=>state.adminOrders)
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.auth)
  const navigate = useNavigate()


  useEffect(()=> {
    if(!user || user.role !=="admin"){
      navigate("/")
    }else {
        dispatch(fetchAllOrders())
    }

  },[dispatch,navigate,user])

  const handleStatusChange = (orderId, value) => {
    
    dispatch(updateOrderStatus({ id: orderId, status: value }));
};

     
  return (
    <div className='max-w-7xl mx-auto mb-5    p-6'>
        <h2 className='font-semibold text-2xl mb-4'>Order ManageMent</h2>
        <div className='w-full overflow-x-auto rounded shadow-md'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-50 uppercase p-2'>
                    <tr>
                        <th className='p-2'>Order id</th>
                        <th className='p-2' >Customer</th>
                        <th className='p-2'>Total Price</th>
                        <th className='p-2'>Status</th>
                        <th className='p-2'>action</th>


                    </tr>

                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order,index)=>(
                        <tr className='border hover:bg-gray-50 cursor-pointer' key={index}>
                            <td className='p-4 whitespace-nowrap font-medium text-gray-900'>#{order._id}</td>
                            <td className='p-4'>{order.user.name}</td>
                            <td className='p-4'>${order.totalPrice}</td>
                            <td className=''>
                                <select 
                                 className=' border bg-gray-50 rounded border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2'
                                onChange={(e)=>handleStatusChange(order._id ,e.target.value)} value={order.status}>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Canceled</option>
                                </select>

                            </td>

                            <td>
                                <button 
                                onClick={()=>handleStatusChange(order._id,"Delivered")}
                                className='bg-green-500 rounded text-white py-2 px-2 text-sm hover:bg-green-400 '>
                                    Mark As Deleiverd
                   
                                </button>
                            </td>

                        </tr>
                    ))
                  ) : (
                    <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                No order found
                            </td>
                    </tr>
                  )}
                </tbody>

            </table>  

        </div>

    </div>
  )
}
