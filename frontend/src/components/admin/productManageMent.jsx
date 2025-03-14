import React from 'react'
import { Link } from 'react-router-dom'

export const ProductManageMent = () => {

    const products = [
        {
            _id : 1234,
            name: "daya",
            price :654,
            sku: "76543456"
        },
        {
            _id : 4,
            name: "madhu",
            price :64,
            sku: "9876789"
        },
    ]

    const handleDelete =(userId)=> {
        if(window.confirm("Are you sure you want to delete  this user")){
            console.log("deleting user id :",userId)
        }

    }
  return (
    <div className='max-w-7xl p-6 mx-auto'>
        <h2 className='text-2xl font-semibold mb-4 '>Product Management</h2>
        <div className="overflow-x-auto shadow-sm rounded"></div>
         <table className='min-w-full text-gray-500 text-left'>
            <thead className='bg-gray-50 uppercase text-gray-700'>
                <tr className='border'>
                    <th className='p-4'>Name</th>
                    <th className='p-4'>price</th>
                    <th className='p-4'>sku</th>
                    <th className='p-4'>action</th>
                </tr>

            </thead>

            <tbody className='rounded-l shadow-md'>
                {products.length > 0 ? ( products.map((product)=>(
                    <tr className='border' key={product._id}>
                        <td className='p-4'>{product.name}</td>
                        <td className='p-4'>{product.price}</td>
                        <td className='p-4'>{product.sku}</td>
                        <td className='flex items-center p-2 gap-3 '>
                            <Link  
                            className='px-2 py-1 bg-yellow-500 hover:bg-yellow-300 rounded '
                            to={`/admin/products/${product._id}/edit`}>
                               Edit
                            </Link>

                            <button onClick={()=>handleDelete(product._id)} className='px-2 py-1 bg-red-600 hover:bg-red-400 text-white rounded'>
                                Delete
                            </button>

                        </td>
                    </tr>

                ))

                ) : (
                    <tr>
                        <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No Product found
                                </td>
                        </tr>
                )}


            </tbody>

         </table>

    </div>
  )
}
 