import React from 'react'
import { useSearchParams } from 'react-router-dom'

export  const SortOption = () => {

  const [searchParamas ,setSearchParamas] = useSearchParams()

  const handleSortChange = (e)=> {

    const sortBy = e.target.value;
    searchParamas.set("sortBy",sortBy)
     setSearchParamas(searchParamas)


  }
  return (
    <div className='mb-2 flex items-center justify-end pr-5'>
      <select 
      onChange={handleSortChange}
      value={searchParamas.get("sortBy") || ""}
      id='sort' className='border rounded p-1'>
        <option value=''>Default</option>
        <option value='priceAsc'>Price: Low to High</option>
        <option value='priceDesc'>Price : High to Low</option>
        <option value='popularity'>Popularity</option>
      </select>
    </div>
  )
}

