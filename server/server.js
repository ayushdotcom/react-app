import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { fetchNews } from "../src/fetchData";
import Homepage from "../src/components/Homepage/Homepage";
import Loadable from 'react-loadable';


const PORT = 8000;

const app = express();
const router = express.Router();
console.log("dsfasf", router);
router.use("^/$", (req, res) => {
  

  fs.readFile(
    path.resolve(__dirname, "..", "build", "index.html"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("error", err);
        return res.status(500).end();
      }
      if (req.originalUrl === "/") {
        console.log("req.originalUrl", req.originalUrl);
        fetchNews("/").then(news => {

          return res.send(
            data.replace(
              '<div id="root"></div>',
              `<div id="root">${ReactDOMServer.renderToString(
                <Homepage data={news} />
              )}</div>`
            )
          );
        });
      } else {
        let page=req.originalUrl.split("=")
        console.log("resle  eq.originalUrl", page[1]);
        fetchNews(page[1]).then(
          news => {
            return res.send(
              data.replace(
                '<div id="root"></div>',
                `<div id="root">${ReactDOMServer.renderToString(
                  <Homepage data={news} />
                )}</div>`
              )
             
            );
          }
        );
      }
    }
  );
});

router.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(router);

app.listen(PORT, error => {
  if (error) {
    return console.log("An error occured", error);
  }
  console.log(`App launched on ${PORT}`);
});
