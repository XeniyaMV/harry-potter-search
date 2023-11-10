import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import getFullClassName from '../../../helpers/getFullClassName';
import transformResponseToDetailsInfo from '../helpers/transformResponseToDetailsInfo';
import { DetailsInfo, Props } from '../../../types';
import getCharacterResult from '../../../api/helpers/getCharacterResult';
import apiBase from '../../../api/constants/apiBase';
import cardImage from '../../../assets/card-picture.jpg';
// import getFilmResult from '../../../api/helpers/getFilmResult';

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
      const search = searchParams.get('details');
      const result = await getCharacterResult(apiBase.baseUrl, apiBase.path, search || '');
      setDetails(transformResponseToDetailsInfo(result.data));
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
          <div className="details__image-wrapper">
            <img className="details__image" src={details?.image || cardImage} alt="card image" />
          </div>
          <ul className="list details__list">
            {details
              ? Object.entries(details).map(
                  (item) =>
                    item[0] !== 'id' &&
                    item[0] !== 'image' && (
                      <li key={item[0].concat(`: ${item[1]}`)} className="list__item">
                        <span className="plain-text_highlight">{item[0].replace('_', ' ')}:</span>&nbsp;
                        {item[0] !== 'jobs' ? (
                          item[1] || 'Unknown'
                        ) : (
                          <ul className="sublist">
                            {details.jobs?.map((job) => (
                              <li key={job} className="sublist__item">
                                {job}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                )
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
