import React from 'react'

const DescriptionMovie = ({description}) => {
  return (
    <div className='grid mt-8 gap-3'>

    <span>
        <h1 className='text-xl font-bold text-foreground'>Description</h1>
    </span>
        {description}

    </div>
  )
}

export default DescriptionMovie
