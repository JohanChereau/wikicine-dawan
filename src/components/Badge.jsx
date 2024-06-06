import React from 'react'


const Badge = ({rating, moonIcon}) => {

  return (
    <div className="container w-fit border border-white rounded">
    <div>      
      rating : {rating} 
    </div>
    </div>
  )
}

export default Badge
