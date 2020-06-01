import fetch from "isomorphic-fetch";

export const fetchNews = (page) => {
  if(page==="/"){
  return fetch(`https://hn.algolia.com/api/v1/search/`).then(res => res.json());
  }
  else{
    return fetch(`https://hn.algolia.com/api/v1/search/?page=${page}`).then(res => res.json());

  }
};


