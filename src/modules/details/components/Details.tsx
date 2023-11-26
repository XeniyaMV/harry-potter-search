import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import getFullClassName from '../../../helpers/getFullClassName';
import transformResponseToDetailsInfo from '../helpers/transformResponseToDetailsInfo';
import { DetailsInfo, Props } from '../../../types';
import apiBase from '../../../api/constants/apiBase';
import cardImage from '../../../assets/card-picture.jpg';
import crossIcon from '../../../assets/cross.svg';
import Loader from '../../../UI/loader/Loader';
import { useGetCharacterResultQuery } from '../../../api/helpers/apiSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { detailsIsOpenUpdated } from '../../../helpers/reducers/detailsSlice';

const Details = (props: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const fullClassName = getFullClassName('details', props.additionalClassName);
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState<DetailsInfo>();
  const id = useAppSelector((state) => state.details.value.id);
  const {
    data: cardInfo,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetCharacterResultQuery({
    path: apiBase.path,
    id,
  });

  useEffect(() => {
    if (isSuccess) {
      setDetails(transformResponseToDetailsInfo(cardInfo.data));
    }
  }, [isSuccess, cardInfo]);

  if (isLoading || isFetching) {
    return (
      <section data-testid="details-component" className={fullClassName}>
        <div className="container details__wrapper">
          <Loader />
        </div>
      </section>
    );
  }
  if (isError) {
    return (
      <section data-testid="details-component" className={fullClassName}>
        <div className="container details__wrapper">
          <Link
            data-testid="close"
            className="details__close"
            to={`/?page=${searchParams.get('page') ? searchParams.get('page') : 1}`}
            onClick={(): void => {
              dispatch(detailsIsOpenUpdated(false));
            }}
          >
            <img className="icon" src={crossIcon} alt="close" />
          </Link>
          <h1 className="details__title">Details</h1>
          <div className="details__image-wrapper">
            <img className="details__image" src={details?.image || cardImage} alt="card image" />
          </div>
          <ul className="list details__list">Not found</ul>
        </div>
      </section>
    );
  }
  if (isSuccess) {
    return (
      <section data-testid="details-component" className={fullClassName}>
        <div className="container details__wrapper">
          <Link
            data-testid="close"
            className="details__close"
            to={`/?page=${searchParams.get('page') ? searchParams.get('page') : 1}`}
            onClick={(): void => {
              dispatch(detailsIsOpenUpdated(false));
            }}
          >
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
      </section>
    );
  }
  return <></>;
};

export default Details;
