import { MoonIcon } from '@radix-ui/react-icons'
import Badge from './Badge'

const Card = () => {

    return (
        <div className="container w-72 xl:w-fit">
            <div className="grid gap-5 m-5 p-8 border border-white rounded-3xl text-center flex-wrap">
                <img className="h-48" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                    <h2 className="text-2xl">Title Film/Serie</h2>
                    <div>12/12/12</div>
                    <Badge rating={4.3} Icon={MoonIcon}/>
            </div>
        </div> 
        )
}

export default Card
