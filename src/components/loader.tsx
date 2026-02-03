import React from 'react'

function Loader() {
  return (
    <div className='flex items-center justify-center h-full'>
        <div className='border-8 border-primary border-t-transparent animate-spin w-10 h-10
        rounded-full'>
        </div>    
    </div>
  )
}

export default Loader