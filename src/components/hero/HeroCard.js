import { Link } from "react-router-dom";

export const HeroCard = ({hero}) => {

    const imagePath = `/assets/${hero.id}.jpg`;
    
  return (

    <div className='col-4 animate__animated animate__fadeIn'>
        <div className='card mb-3'>
            <div className='row g-0'>
                <div className='col-4'>
                    <img src={imagePath} className='card-img' alt={hero.superhero} />
                </div>
                <div className='col-8'>
                    <div className='card-body'>
                        <h5 className='card-title'>{hero.superhero}</h5>
                        <p className='card-text'>{hero.alter_ego}</p>
                        {
                            (hero.alter_ego !== hero.characters)
                                && <p className='text-muted'>{hero.characters}</p>
                        }

                        <p className='cart-text'>
                            <small className='text-muted'>{hero.first_appearance}</small>
                        </p>

                        <Link 
                            to={`/hero/${hero.id}`} 
                        >
                            See more
                        </Link>
                    </div>
                </div>
            </div>
            {/* <h1>{hero.superhero}</h1>
            <hr/>
            <h3>{hero.publisher}</h3>
            <p>{hero.alter_ego}</p>
            <p>{hero.first_appearance}</p>
            <p>{hero.characters}</p> */}
        </div>
    </div>
  );
};
