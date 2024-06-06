import React from 'react'


const Badge = ({rating, Icon}) => {

  return (
    <div className="container w-fit border border-white rounded">
    <div>
      {rating}
    </div>
    </div>
  )
}

export default Badge
