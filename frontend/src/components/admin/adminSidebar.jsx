import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUsers, FaBox, FaShoppingCart, FaStore,FaSignOutAlt  } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { clearCart } from '../../redux/slices/cartSlice'

export const AdminSidebar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = ()=> {
      dispatch(logout())
      dispatch(clearCart())
        navigate("/")
    }
  return (
    <div className="p-6 bg-gray-900 h-full text-white">
      <div className="mb-6">
        <NavLink to="/" className="text-2xl font-medium">
          Rabbit
        </NavLink>
      </div>

      <h2 className="text-xl font-medium mb-4 text-center">Admin Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
          "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUsers />
          <span>User</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
          "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBox />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
          "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaShoppingCart />
          <span>Order</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
          "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>

      <div className="mb-6"></div>
      <button onClick={handleLogout} className='bg-red-500 flex items-center justify-center w-full rounded-lg px-3 py-2 cursor-pointer hover:bg-red-300'>
        <FaSignOutAlt className='mr-2'/>  <span>Logout</span>
      </button>
    </div>
  )
}
