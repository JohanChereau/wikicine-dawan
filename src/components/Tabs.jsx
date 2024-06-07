import React from 'react'

const Tabs = () => {
  return (
    <div className='grid mt-8 gap-3'>
      <div className='text-xl font-bold'>Reviews</div>
      <div className='text-xl font-bold '>Critics</div>
      <div className='text-xl font-bold'>Cast</div>
      <div className='text-xl font-bold'>Anecdotes</div>

        <div className='col-start-1 p-1'>
          Last Review
        </div>
        <button className='col-start-4 bg-primary-foreground rounded-sm p-2'>Add a review</button>

    </div>
  )
}

export default Tabs
