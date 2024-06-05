import React from 'react'

const Badge = () => {
    let note = 0;
    const star = <img src="../images/yellow-star-note.png" alt=""></img>;

    return (
        <div>
            <img 
            className="star"
            src="../images/yellow-star-note.png"
            alt="" />  
                <h2>Title</h2>
                    <div className="">
                        {star} {note}
                    </div>
        </div>
        )
}

export default Badge
