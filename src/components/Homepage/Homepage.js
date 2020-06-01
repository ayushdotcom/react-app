import React from "react";
import Header from "../Header/Header";
import Chart from "../Chart/Chart";
import RowData from "../RowData/RowData";

import "../commonStyles.css";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    let data;
    if (props.data) {
      data = props.data;
    }

    this.state = {
      news: data,
      ylabels: data && data.hits.map(item => item.points),
      xdata: data && data.hits.map(item => item.objectID),
      hiddenId: [],
      upvotedId: [],
      pageId: 0
    };
  }
  componentDidMount() {
    const query = window.location.href.split("=");
    console.log(query);
    const currentPage = (query && query[1]) || 0;
    fetch(`https://hn.algolia.com/api/v1/search/?page=${currentPage}`)
      .then(res => res.json())
      .then(resp => {
        this.setState({
          news: resp,
          ylabels: resp.hits.map(item => item.objectID),
          xdata: resp.hits.map(item => item.points),
          pageId: currentPage
        });
      })
      .catch(error => console.log(error));
  }
  clickPrevious(){
    this.setState(prevState => {
        return { pageId: prevState.pageId - 1 };
      });
  }
 clickNext(){
    this.setState(prevState => {
        return { pageId: prevState.pageId + 1 };
      });  }
  render() {
    const { news, ylabels, xdata } = this.state;
    return (
      <div className="mainContainer">
        <Header />

        {news &&
          news.hits &&
          news.hits.map(item => {
            return (
              <>
                {/* <div className="rowcontainer">
                  <div className="numbers">{item.num_comments || 0}</div>
                  <div className="numbers">
                    <span>{item.points}</span>
                  </div>
                  <div
                    className="upvote"

                  >
                    &#9650;
                  </div>

                  <div className="titleContainer">
                    <div>
                      {item.title || item.story_title || item.story_text || ""}
                      <span className="url">
                        {item.url &&
                          `(${item.url &&
                            item.url
                              .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
                              .split("/")[0]})`}
                      </span>
                    </div>

                    <div className="author">{`by ${item.author}`}</div>
                    <div className="url">
                      {`${new Date(
                        item.created_at.substring(0, item.created_at.length - 1)
                      ).getHours() - new Date().getHours()} hours ago`}
                      }
                    </div>
                    <button className="hide">[ hide ]</button>
                  </div>
                </div> */}
                <RowData
                  id={item.objectID}
                  comments={item.num_comments}
                  points={item.points}
                  title={item.title}
                  storyUrl={item.story_url}
                  author={item.author}
                  created={item.created_at}
                  storyTitle={item.story_title}
                  url={item.url}
                  text={item.story_text}
                />
              </>
            );
          })}
          <div className="linkWrapper">
            <a className="cursor upvoted" onClick={this.clickPrevious}>
            Previous
            </a>
            |
            <a className="cursor upvoted" onClick={this.clickNext}>
              Next
            </a>
        </div>

        {ylabels && xdata && (
          <div className="graphContainer">
            <Chart labels={ylabels} data={xdata} />
          </div>
        )}
      </div>
    );
  }
}
export default Homepage;
