import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { getHeroesByName } from "../../helpers/getHeroesByName";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../hero/HeroCard";
import { useMemo } from "react";

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;
  
  const heroesFiltered = useMemo( () => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
  navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Searchs</h1>
      <hr/>

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr/>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder="Search heroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-primary mt-3" type="submit">
              Buscar...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr/>
          {
            (q==='')
              ? <div className="aler alert-info animate__animated animate__flash">
                Busca un heroe!
              </div>
              : ( heroesFiltered.length === 0 ) 
                && <div className="alert alert-danger animate__animated animate__flash">
                  No se encontro: {q}
                </div>
          }
          {
            heroesFiltered.map(hero => (
              <HeroCard key={hero.id} hero={hero}/>
            ))
          }
        </div>
      </div>
    </>
  );
};
