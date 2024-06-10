import { MoonIcon } from '@radix-ui/react-icons'
import Badge from '../Badge'

const Card = ({moviePoster, movieTitle, releaseDate}) => {

    return (
        <div className="w-72 p-none">
            <div className="grid gap-5 m-5 p-8 3xl">

                    <div>
                        <img className="aspect-[9/16] object-cover image rounded" src={moviePoster} alt="moviePoster" />
                    </div>
                        
                        <div className="text-2xl">
                            {movieTitle}
                        </div>

                       <div>{releaseDate}</div>

                    <Badge rating={4.3} Icon={MoonIcon}/>
            </div>
        </div> 
        )
}

export default Card
