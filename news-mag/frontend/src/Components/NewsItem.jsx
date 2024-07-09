import React from 'react';
import image from '../assets/news.jpeg';

const NewsItem = ({ title, description, src, url }) => {
  const defaultTitle = "Shortpedia is a short news app which brings you live news updates";
  const defaultDescription = "Shortpedia is a short news app which brings you live news updates from political news, business news";

  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
      style={{ maxWidth: "300px" }}
    >
      <img
        src={src ? src : image}
        style={{ height: "200px", width: "270px" }}
        className="card-img-top"
        alt="news"
      />
      <div className="card-body">
        <h5 className="card-title">{title ? title.slice(0, 45) : defaultTitle}</h5>
        <p className="card-text">
          {description ? description.slice(0, 90) : defaultDescription}
        </p>
        <a href={url} className="btn btn-primary">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
