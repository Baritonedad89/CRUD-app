var db = require("../models");

module.exports = function (app) {

  
  // app.get('/', (req, res) => {
  //   db.Entry.findAll({}).then(function (allPosts) {
  //     // res.json(allPosts);

  //   });
  // })

  // Get all examples
  // const getAllPosts = () => {
  app.get("/api/posts/", function (req, res) {
    db.Entry.findAll({}).then(function (dbEntries) {
      res.json(dbEntries);

    });
  });

  
// }
// getAllPosts()

  // Create a new example
  app.post("/api/posts/new", function (req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const text = req.body.text;
    const author = `${firstName} ${lastName}`;

    db.Entry.create({
      author: author,
      text: text
    }).then(function (newPost) {
      res.json(newPost);
    });
  });

  // Delete an example by id
  app.delete("/api/posts/:id", function (req, res) {
    db.Entry.destroy({ where: { id: req.params.id } }).then(function (deletedPost) {
      res.json(deletedPost);
      // getAllPosts();

    });
  });

  // // Delete an example by id
  // app.delete("/api/posts/:id", function (req, res) {
  //   db.Entry.destroy({ where: { id: req.params.id } }).then(function (deletedPost) {
  //     res.json(deletedPost);
  //     getAllPosts();

  //   });
  // });



};
