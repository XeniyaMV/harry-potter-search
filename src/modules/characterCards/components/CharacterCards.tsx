import { useEffect } from 'react';
import CharacterCard from '../../../components/characterCard/CharacterCard';
import Loader from '../../../UI/loader/Loader';
import transformResponseToCardInfo from '../helpers/transformResponseToCardInfo';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { pageInfoUpdated } from '../../../helpers/reducers/pageInfoSlice';
import { useGetSearchResultQuery } from '../../../api/helpers/apiSlice';
import apiBase from '../../../api/constants/apiBase';

const CharacterCards = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.searchTerm.value);
  const cardsPerPage = useAppSelector((state) => state.cardsPerPage.value);
  const page = useAppSelector((state) => state.page.value);
  const {
    data: cardInfos,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetSearchResultQuery({
    path: apiBase.path,
    search: searchTerm,
    page: page,
    limit: cardsPerPage,
  });

  useEffect(() => {
    if (isSuccess) {
      const newPageInfo = {
        hasNextPage: !cardInfos.meta.pagination.next ? false : true,
        hasPrevPage: !cardInfos.meta.pagination.prev ? false : true,
      };
      dispatch(pageInfoUpdated(newPageInfo));
    }
  }, [isSuccess, cardInfos, dispatch]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isSuccess) {
    return (
      <section data-testid="character-cards-component" className="character-cards">
        <div className="container character-cards__wrapper">
          {cardInfos.data.length !== 0 ? (
            transformResponseToCardInfo(cardInfos.data).map((item) => <CharacterCard key={item.id} cardInfo={item} />)
          ) : (
            <span>We couldn&apos;t find any results for your request. Please try again with different keywords</span>
          )}
        </div>
      </section>
    );
  }
  return <></>;
};

export default CharacterCards;
