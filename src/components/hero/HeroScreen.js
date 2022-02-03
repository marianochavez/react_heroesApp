import { useMemo } from "react";

import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getHeroById } from "../../helpers/getHeroById";

export const HeroScreen = () => {
  const { heroId } = useParams();
  const navigate = useNavigate();
  const hero = useMemo(() => getHeroById(heroId), [heroId]);

  const handleReturn = () => {
    navigate(-1);
  };

  if (!hero) {
    // saca al usuario de la pagina
    return <Navigate to="/" />;
  }

  const imgagePath = `/assets/${hero.id}.jpg`;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={imgagePath}
          className="img-thumbnail animate__animated animate__fadeInLeft"
          alt={hero.superhero}
        />
      </div>

      <div className="col-8">
        <h1>{hero.superhero}</h1>
        <hr />
        <ul className="list-group list-group-flush mb-3 animate__animated animate__fadeIn">
          <li className="list-group-item">
            <b>Alter ego:</b> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b> {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance:</b> {hero.first_appearance}
          </li>
        </ul>

        <h5>Characters</h5>
        <p>{hero.characters}</p>

        <button className="btn btn-outline-info" onClick={handleReturn}>
          Regresar
        </button>
      </div>
    </div>
  );
};
