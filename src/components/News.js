import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const fetchArticles = async (pageNumber) => {
    try {
      props.setProgress(10);
      setLoading(true);

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${pageNumber}&pagesize=${props.pagesize}`;
      const res = await fetch(url);
      const data = await res.json();

      props.setProgress(50);

      if (Array.isArray(data.articles)) {
        if (pageNumber === 1) {
          setArticles(data.articles);
        } else {
          setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        }

        setTotalResults(data.totalResults);
      } else {
        console.warn('No articles found:', data);
      }

      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    fetchArticles(page); // Load initial data
  }, []);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage);
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">
          NewsMonkey - {capitalizeFirstLetter(props.category)} Headlines
        </h1>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={loading && <Spinner />}
        >
          <div className="row">
            {        console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",page,totalResults)
}
            {articles.map((item, index) =>
              item.title &&
              item.title.trim().length > 0 &&
              item.description &&
              item.description.trim().toLowerCase() !== 'no description' &&
              item.description.trim().length > 0 &&
              item.urlToImage &&
              item.url ? (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={item.title.slice(0, 45)}
                    description={item.description.slice(0, 88)}
                    imageUrl={item.urlToImage}
                    newsUrl={item.url}
                    author={item.author}
                    publishedAt={item.publishedAt}
                  />
                </div>
              ) : null
            )}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pagesize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
