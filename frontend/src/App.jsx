import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserLayout } from './components/layout/userLayout'
import { Home } from './components/pages/home'
import { Toaster } from "sonner"
import { Login } from './components/pages/login'
import { Register } from './components/pages/register'
import { Profile } from './components/pages/profile'
import { CollectionPage } from './components/pages/collectionPage'
import { ProductDetails } from './components/product/productDetails'
import { Checkout } from './components/cart/checkout'
import { OrderConfirmation } from './components/pages/orderConfirmation'
import { OrderDetailsPage } from './components/layout/orderDetailsPage'
import { MyOrderPage } from './components/pages/myOrderPage'
import { AdminLayout } from './components/admin/adminLayout'
import { AdminHomePage } from './components/pages/adminHomePage'
import { UserManageMent } from './components/admin/userManageMent'
import { ProductManageMent } from './components/admin/productManageMent'
import { EditProduct } from './components/admin/editProduct'
import { OrderManageMent } from './components/admin/orderManageMent'


import { Provider } from "react-redux"
import store from './redux/store'
import { ProtectedRoute } from './components/common/protectedRoute'

const App = () => {
  return (

    <Provider store={store} >
      <Router>
        <Toaster position='top-right' />
        <Routes>
          <Route path='/' element={<UserLayout />}>

            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/collections/all' element={<CollectionPage />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-confirmation' element={<OrderConfirmation />} />
            <Route path='/order/:id' element={<OrderDetailsPage />} />
            <Route path='/my-orders' element={<MyOrderPage />} />


          </Route>

          {/* admin layout */}
          <Route path='/admin' element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>

            <Route index element={<AdminHomePage />} />
            <Route path='/admin/users' element={<UserManageMent />} />
            <Route path='/admin/products' element={<ProductManageMent />} />
            <Route path='/admin/products/:id/edit' element={<EditProduct />} />
            <Route path='/admin/orders' element={<OrderManageMent />} />
          </Route>




        </Routes>
      </Router>

    </Provider>
  )
}

export default App