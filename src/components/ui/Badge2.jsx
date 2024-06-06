import React, { useState } from 'react'
import Badge from '../Badge.jsx'
import { MoonIcon } from '@radix-ui/react-icons'

const Card = () => {

    const [date, setDate] = useState('01/01/01')

    return (
        <div className="container w-fit">
        <div className="grid gap-5 m-5 p-8 border border-white rounded text-center flex-wrap">
            <img className="h-52" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                <h2 className="text-2xl">Title Film/Serie</h2>
                <p>{date}</p>
                    <Badge rating={4.3} icon={MoonIcon}/>
        </div>
        </div>
        )
}

export default Card
