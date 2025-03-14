import React from 'react'
import { Link } from 'react-router-dom'

export const AdminHomePage = () => {

    const orders = [
        {
            _id: 23123,
            user: {
                name: "daya"

            },
            totalPrice: 123,
            status: "processing"
        },
        {
            _id: 23123,
            user: {
                name: "daya"

            },
            totalPrice: 123,
            status: "processing"
        }
    ]
    return (
        <div className=" mx-auto max-w-7xl p-8">
            <h1 className='text-2xl font-bold'>Admin Dashboard</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4  mb-4'>

                <div className="border shadow-lg  p-4 rounded">
                    <h2 className='text-xl  mb-1'>Revenue</h2>
                    <p>$1000</p>
                </div>

                <div className="border shadow-lg  p-4 rounded">
                    <h2 className='text-xl mb-1 '>Total Order</h2>
                    <p className='mb-1'>$1000</p>
                    <Link to="/admin/orders" className='underline text-blue-400'>Manage Order</Link>
                </div>

                <div className="border shadow-lg  p-4 rounded">
                    <h2 className='text-xl mb-1 '>Revenue</h2>
                    <p>$1000</p>
                    <Link to="/admin/products" className='underline text-blue-400'>Manage Products</Link>
                </div>

            </div>

            <div className=''>
                <h2 className='text-2xl font-semibold'>Recent Orders</h2>
            </div>

            <div className="overflow-x-auto max-w-full">
                <table className="min-w-full text-left mx-auto mt-3">
                    <thead className="bg-gray-200 rounded-lg text-l uppercase text-gray-700">
                        <tr>
                            <th className="px-3 py-2 whitespace-nowrap">Order Id</th>
                            <th className="px-3 py-2 whitespace-nowrap">User</th>
                            <th className="px-3 py-2 whitespace-nowrap">Total Price</th>
                            <th className="px-3 py-2 whitespace-nowrap">Status</th>
                            <th className="px-3 py-2 whitespace-nowrap">Order Id</th>
                            <th className="px-3 py-2 whitespace-nowrap">User</th>
                            <th className="px-3 py-2 whitespace-nowrap">Total Price</th>
                            <th className="px-3 py-2 whitespace-nowrap">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr className="hover:bg-slate-50 border" key={index}>
                                    <td className="p-4">{order._id}</td>
                                    <td className="p-4">{order.user.name}</td>
                                    <td className="p-4">{order.totalPrice}</td>
                                    <td className="p-4">{order.status}</td>
                                    <td className="p-4">{order._id}</td>
                                    <td className="p-4">{order.user.name}</td>
                                    <td className="p-4">{order.totalPrice}</td>
                                    <td className="p-4">{order.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="p-4 text-center text-gray-500">
                                    No recent orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
