import React from 'react'


const Badge = ({rating, Icon}) => {

  return (
    <div className="w-fit border border-white rounded p-2">
    <div className='inline-flex gap-3 items-center'>
    <Icon/> {rating}
    </div> 
    </div>
  )
}

export default Badge
