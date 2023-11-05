import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import getFullClassName from '../../../helpers/getFullClassName';
import transformResponseToDetailsInfo from '../helpers/transformResponseToDetailsInfo';
import { DetailsInfo, Props } from '../../../types';
import getSearchResult from '../../../api/helpers/getSearchResult';
import apiBase from '../../../api/constants/apiBase';
import getFilmResult from '../../../api/helpers/getFilmResult';

import crossIcon from '../../../assets/cross.svg';
import Loader from '../../../UI/loader/Loader';

const Details = (props: Props): JSX.Element => {
  const fullClassName = getFullClassName('details', props.additionalClassName);
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState<DetailsInfo>();
  const [loader, setLoader] = useState(false);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      setLoader(true);
      const newFilmTitles = [];
      const search = searchParams.get('details');
      const result = await getSearchResult(apiBase.baseUrl, apiBase.path, search || '');
      const films = result.results.length !== 0 ? result.results[0].films : [];
      for (let i = 0; i < films.length; i += 1) {
        const film = await getFilmResult(films[i]);
        newFilmTitles.push(film.title);
      }
      setDetails(transformResponseToDetailsInfo(result.results[0], newFilmTitles));
      setLoader(false);
    };
    fetchData();
  }, [searchParams]);

  return (
    <section className={fullClassName}>
      {!loader ? (
        <div className="container details__wrapper">
          <Link className="details__close" to={`/?page=${searchParams.get('page') ? searchParams.get('page') : 1}`}>
            <img className="icon" src={crossIcon} alt="close" />
          </Link>
          <h1 className="details__title">Details</h1>
          <ul className="list details__list">
            {details
              ? Object.entries(details).map((item) => (
                  <li key={item[0].concat(`: ${item[1]}`)} className="list__item">
                    <span className="plain-text_highlight">{item[0].replace('_', ' ')}:</span>&nbsp;
                    {item[0] !== 'films' ? (
                      item[1]
                    ) : (
                      <ul className="sublist">
                        {details.films?.map((film) => (
                          <li key={film} className="sublist__item">
                            {film}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              : 'Not found'}
          </ul>
        </div>
      ) : (
        <div className="container details__wrapper">
          <Loader />
        </div>
      )}
    </section>
  );
};

export default Details;
