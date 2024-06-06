import React from 'react'


const Badge = ({rating, Icon}) => {

  return (
    <div className="container w-fit border border-white rounded">
    <div className='inline-flex gap-5 items-center'>
      {rating} <Icon/>
    </div> 
    </div>
  )
}

export default Badge
