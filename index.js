const express = require("express");
const fs = require("fs");
const axios = require("axios");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

// Exercise 2
// http://expressjs.com/fr/4x/api.html#res.sendFile
// res.sendFile() transfers the file at the given path.
// + Sets the Content-Type response HTTP header field based on the filename’s extension.
// Unless the root option is set in the options object, path must be an absolute path to the file.
// app.put("/", (req, res) => {
//   let options = {
//     root: __dirname,
//     dotfiles: "deny",
//     headers: {
//       "x-timestamp": Date.now(),
//       "x-sent": true,
//     },
//   };
//   res.sendFile("index.html", options, (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log("File successfully sent");
//     }
//   });
// });

// or

app.put("/", (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Exercise 3
// http://expressjs.com/fr/4x/api.html#res.json
// res.json() Sends a JSON response (with the correct content-type)
// that is the parameter converted to a JSON string using JSON.stringify().
app.delete("/", (req, res) => {
  res.json({ good: "yep" });
});

// Exercise 4
// EJS = Embedded JavaScript templates: https://www.npmjs.com/package/ejs
// npm i ejs
// mkdir views
// So we only have to define pages/index since the full path is views/pages/index.
// https://ejs.co/#docs
app.set("view engine", "ejs");
app.get("/test-ejs", (req, res) => {
  res.render("pages/index", {
    myTitle: "my first title",
  });
});

// Exercise 5
app.get("/test-ejs2", (req, res) => {
  res.render("pages/index", {
    users: ["Bob", "John", "Jane"],
  });
});

// Exercise 6
// https://github.com/expressjs/method-override
app.use(methodOverride("_method"));
app.put("/override", (req, res) => {
  console.log("banana");
});

// Exercise 7
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/showPost", (req, res) => {
  console.log(req.body.firstName, req.body.lastName);
});

// Exercise 8
app.get("/showGet", (req, res) => {
  console.dir(req.query.q);
});

// Exercise 9
// http://expressjs.com/en/api.html#req.param
app.get("/number/:num", (req, res) => {
  const { num } = req.params;
  res.status(200).send(num);
});

// Exercise 10
// https://github.com/axios/axios
app.get("/postList", (req, res) => {
  axios.get("http://jsonplaceholder.typicode.com/posts/1").then((r) => {
    res.send(r.data);
  });
});

// Exercise 11
// https://nodejs.org/api/fs.html
app.get('/postList/json', (req, res) => {
  axios.get('http://jsonplaceholder.typicode.com/posts/1')
    .then(r => {
      const data = JSON.stringify(r.data)
      fs.writeFile('posts.json', data, (err) => {
        if (err) throw err
        res.send('Post data has been saved to Json File')
      })
    })
})

// Or: to append data to a JSON file:
// app.get("/postList/json/:id?", (req, res) => {
//   let multi = [];

//   fs.readFile("./posts.json", (err, prevData) => {
//     if (err) console.log(err);

//     if (prevData) {
//       multi = JSON.parse(prevData);
//     }

//     axios.get(`http://jsonplaceholder.typicode.com/posts/${req.params.id || 1}`)
//       .then((r) => {
//         multi.push(r.data);

//         fs.writeFile("posts.json", JSON.stringify(multi), (err) => {
//           if (err) throw err;
//           res.send("Post data has been saved to Json File");
//         });

//         res.send(multi);
//     });
//   });
// });

// Exercise 12
// https://github.com/Unitech/pm2
// npm install pm2 -g
// pm2 start index.js
// pm2 list
// pm2 stop 0

// Exercise 13
// https://pm2.keymetrics.io/docs/usage/cluster-mode/
// pm2 start app.js -i max
// pm2 list
// pm2 delete 0

// Exercise 14
// https://pm2.keymetrics.io/docs/usage/watch-and-restart/
// pm2 start app.js --watch
// pm2 stop 0  ==> will not stop watching
// pm2 stop 0 --watch ==> will stop watching

// Exercise 15
// https://pm2.keymetrics.io/docs/usage/monitoring/
// pm2 logs 0
// pm2 logs 0 --lines 100
// pm2 monit


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
