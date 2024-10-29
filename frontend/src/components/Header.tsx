import React from 'react'

const Header = () => {
  return (
   <>
   <div className='flex justify-center w-full bg-gray-100 border-b shadow-sm py-2'>
     <div className='flex w-full max-w-[90vw] justify-between items-center'>
        <div>
            <span className='text-3xl text-red-500'>Deliver</span>
        </div>
        <div className='flex gap-2 text-red-500'>
            <span className='cursor-pointer'>
                SignUp
            </span>
            <span className='cursor-pointer'>
                SignUp
            </span>
        </div>
     </div>
   </div>
   </>
  )
}

export default Header