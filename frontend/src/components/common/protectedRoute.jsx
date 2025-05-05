// ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />
  }

  if (role && user.role !== role) {
    // Logged in but not authorized
    return <Navigate to="/" />
  }

  return children
}
