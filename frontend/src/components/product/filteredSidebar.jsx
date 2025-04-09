
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const FilteredSidebar = () => {


    const [searchParamas, setSearchParamas] = useSearchParams()
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
        
    })

    const [priceRange, setPriceRange] = useState([0, 100]);

    const handlePriceRange = (e)=>{

        const newPrice = Number(e.target.value);
        setPriceRange ([0,newPrice])
        const newFilters = {...filters ,minPrice : 0 , maxPrice : newPrice}
        setFilters(newFilters)
        updateUrlParams(newFilters)
        
    }
  

    const handleFilterchange =(e)=>{
        const {name,value,type,checked} = e.target
        let newFilters = {...filters}
      


        if(type === "checkbox"){
            if(checked){
                newFilters[name] = [...(newFilters[name] || []), value];

                
            }else {
                newFilters[name] = (newFilters[name] || []).filter((item) => item !== value);

            }

        }else {
            newFilters[name] = value
        }
        setFilters(newFilters)
       
        updateUrlParams(newFilters)
       
    }

     const updateUrlParams = (newFilters)=> {
        const params = new URLSearchParams ();

        Object.keys(newFilters).forEach((keys)=>{


            if(Array.isArray(newFilters[keys]) &&  newFilters[keys].length > 0){

                params.append(keys,newFilters[keys].join(","))
            }else if (newFilters[keys]){
                params.append (keys,newFilters[keys])
            }
        })

        setSearchParamas(params)
        navigate(`?${params.toString()}`)

       console.log(newFilters,"daya")
      
     }

     useEffect(() => {

        const params = Object.fromEntries([...searchParamas])

        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice ? Number(params.minPrice) : 0, 
            maxPrice: params.maxPrice ? Number(params.maxPrice) : 100,
        })

        setPriceRange([0, params.maxPrice || 100])
       

    }, [searchParamas])



    const colors = [
        "red",
        "greeen",
        "blue",
        "yellow",
        "black",
        "orange",
        "brown ",
        "pink",
       
    ]

    const categories = ["Top Wear", "Bottom Wear"];
    const sizes = ["XS", 'S', "M", "L", "XL", "XXL"]

    const materials = [
        "cotton",
        "wool",
        "denim",
        "silk",
        "polyester",
        "linen",
        "fleece"

    ]
    const gender = ["Men", "Women"]

    const brands = [
        "Nike",
        "Adidas",
        "Puma",
        "Reebok",
        "Levi's",
        "Zara",
        "H&M",
        "Gucci",
       
      ];
      

   
    return (
        <div className='p-4 pb-20 overflow-y-auto h-screen'>
            
            <h3 className='text-xl mb-2 font-medium text-gray-800'>Filter</h3>

            {/* category filter */}
            <div className='mt-6 '>
                <label className='text-gray-700'>Category</label>

                {categories.map((category) => (
                    <div key={category} className=' flex items-center mb-1 ml-2'>
                        <input
                            type="radio"
                            name='category'
                            value={category}
                           checked= {filters.category === category}
                            onChange={handleFilterchange}
                            className='mr-2 cursor-pointer h-4 w-4 '
                        />

                        <span className='text-gray-700'>{category}</span>
                    </div>
                ))}
            </div>

            {/* gender  */}

            <div className='mt-6 '>
                <label className='text-gray-700'>Gender</label>

                {gender.map((gender) => (
                    <div key={gender} className=' flex items-center mb-1 ml-2'>
                        <input type="radio"
                            name='gender'
                            value={gender}
                            checked ={filters.gender === gender}
                            onChange={handleFilterchange}
                            className='mr-2 cursor-pointer h-4 w-4 '
                        />

                        <span className='text-gray-700'>{gender}</span>
                    </div>
                ))}
            </div>


            {/* color */}

            <div className='mb-6'>
                <label className='text-gray-700'>Colors</label>

                <div className='flex flex-wrap gap-2'>
                    {colors.map((color) => (
                        <button key={color}
                            value={color}
                            name='color'
                            onClick={handleFilterchange}
                            style={{ background: color.toLocaleLowerCase() }}
                            className={`border h-8 w-8  rounded-full ml-2 border-gray-300 cursor-pointer hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""} `}>

                        </button>
                    ))}
                </div>
            </div>

            {/* size filter */}

            <div className='mb-6 '>
                <label className='text-gray-700 '>Size</label>

                {sizes.map((size) => (

                    <div key={size} className='mb-1'>
                        <input
                         type='checkbox' 
                         name='size' 
                         value={size}
                         checked = {filters.size.includes(size)}
                         onChange={handleFilterchange}
                         className='mr-2 ml-2 text-blue-500 h-4 w-4 border-gray-300 focus:ring-blue-500' />
                        <span className='text-gray-700'>{size}</span>
                    </div>


                ))}
            </div>

            {/* material filter */}

            <div className='mb-6 '>
                <label className='text-gray-700 '>Material</label>

                {materials.map((material) => (

                    <div key={material} className='mb-1'>
                        <input 
                        type='checkbox' 
                        name='material' 
                        value={material}
                        checked ={filters.material.includes(material)}
                        onChange={handleFilterchange}
                        className='mr-2 ml-2 text-blue-500 h-4 w-4 border-gray-300 focus:ring-blue-500' />
                        <span className='text-gray-700'>{material}</span>
                    </div>


                ))}
            </div>

            {/* brand filter */}

            <div className='mb-6 '>
                <label className='text-gray-700 '>Brand</label>

                {brands.map((brand) => (

                    <div key={brand} className='mb-1'>
                        <input 
                        type='checkbox' 
                        name='brand' 
                        value={brand}
                        onChange={handleFilterchange}
                        checked ={filters.brand.includes(brand)}
                        className='mr-2 ml-2 text-blue-500 h-4 w-4 border-gray-300 focus:ring-blue-500' />
                        <span className='text-gray-700'>{brand}</span>
                    </div>


                ))}
            </div>

            <div className='mb-6 text-black'>
                <label>
                     Price Range
                </label>

                <input 
                name='priceRange'
                type='range'
                min={0}
                max={100}
                onChange={handlePriceRange}
                value={priceRange[1]}
                className=' w-full h-2 rounded-lg appearance-none bg-gray-300'

                />

                <div className='flex justify-between mt-2 '>
                    <span>$0</span>
                    <span className=''>${priceRange[1]}</span>
                </div>
            </div>




        </div>




    )
}

