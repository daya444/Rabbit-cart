import React, { useState } from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { data, Link } from 'react-router-dom'
import { FiPhoneCall } from "react-icons/fi"
import axios from 'axios'
import { toast } from 'sonner'

export const Footer = () => {

    const [email, setEmail] = useState("")

    const handleSubcribe = async () => {
        if (email) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
                    {email},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        },
                    }
                );

                if (response) {
                    toast.success(response.data.message);
                    setEmail("");
                }


            } catch (error) {
                console.log(error)
                

            }
        }

    }
    return (
        <footer className='py-12 border-t '>
            <div className=' container mx-auto grid grid-cols-1 space-y-2 md:grid-cols-4  px-4 gap-x-8 '>

                <div>
                    <h3 className='text-lg mb-4 font-semibold text-gray-800'>
                        NewsLetters
                    </h3>
                    <p className='font-light text-sm pb-4'>
                        Be the first to hear about the new product,exclusive events and online offers
                    </p>
                    <p className='mb-4 text-sm'>
                        Sign up  and get 10% off your first order
                    </p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubcribe();
                    }} className='flex'>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='border-l border-b border-t border-gray-300 h-10 rounded-l-md transition-all focus:outline-none focus:ring-2 focus:ring-gray-500'
                            placeholder='email'
                        />
                        <button
                            type='submit'
                            className='bg-black text-white text-sm hover:bg-slate-700 px-2 rounded transition-all '
                        >
                            Subscribe
                        </button>
                    </form>

                </div>

                <div>
                    <h3 className='font-semibold mb-4'>
                        Shop
                    </h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link className='text-gray-900 hover:text-gray-500 text-sm' to='#'>
                                Men's Top Wear
                            </Link>
                        </li>
                        <li>
                            <Link className='text-gray-900 hover:text-gray-500 text-sm' to='#'>
                                Women Tops Wear
                            </Link>
                        </li>
                        <li>
                            <Link className='text-gray-900 hover:text-gray-500 text-sm' to='#'>
                                Men's Bottom Wear
                            </Link>
                        </li>
                        <li>
                            <Link className='text-gray-900 hover:text-gray-500 text-sm' to='#'>
                                Women Bottom Wear
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-semibold mb-4'>
                        Support
                    </h3>
                    <ul className='space-y-2'>
                        <li>
                            <Link className='text-gray-900 hover:text-gray-500 text-sm' to='#'>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link className='text-gray-900 hover:text-gray-500 text-sm' to='#'>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link className='text-gray-900 hover:text-gray-500 text-sm' to='#'>
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link className='text-gray-900 hover:text-gray-500 text-sm' to='#'>
                                Features
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-semibold mb-4'>
                        Follow us
                    </h3>

                    <div className='flex items-center  gap-x-2' >
                        <a className='hover:text-gray-500' href="#">
                            <TbBrandMeta className="h-5 w-5" />
                        </a>
                        <a className='hover:text-gray-500' href="#">
                            <IoLogoInstagram className="h-5 w-5" />
                        </a>
                        <a className='hover:text-gray-500' href="#">
                            <RiTwitterXLine className="h-5 w-5" />
                        </a>

                    </div>

                    <h3 className='mt-4 text-gray-500 text-sm'>
                        Contact Us
                    </h3>
                    <p>
                        <FiPhoneCall className='inline-block mr-2' /> 1+ 0123456789
                    </p>

                </div>

            </div>
            <div className='container mt-12 mx-auto px-4  border-t border-gray-200 py-2'>
                <p className='text-sm text-center text-gray-500 tracking-tighter'>
                    © 2025,Compile Tab.All Rights Reserved
                </p>
            </div>
        </footer>
    )
}

