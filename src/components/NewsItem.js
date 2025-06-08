import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt } = this.props;
    const date = new Date(publishedAt);

    return (
      <div>
        <div
                  className="card"
                  style={{
                   
                    minHeight: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    margin:6
                  }}
                >
          <img
            src={imageUrl}
            className="card-img-top"
            alt="news"
            style={{ height: '180px', objectFit: 'cover' }}
          />
          <div
            className="card-body"
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <h5
              className="card-title"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
              }}
            >
              {title}...
            </h5>
            <p
              className="card-text"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontSize: '0.875rem',
                marginBottom: '0.75rem',
              }}
            >
              {description}...
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                {author ? `By ${author}` : 'By Unknown Author'} on {date.toUTCString()}
              </small>
            </p>
            <a
              href={newsUrl}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
