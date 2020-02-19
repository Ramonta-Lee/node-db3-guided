const express = require("express");

const db = require("../data/db-config.js");

const Users = require("./user-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Users.all()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(users => {
      const user = users[0];

      if (users) {
        res.json(users);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;

  Users.add(userData)
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Users.update(id, changes)
    .then(count => {
      if (count) {
        res.json(changes);
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

// list all posts for a user

router.get("/:id/posts", (req, res) => {
  /* 
  This is our query
    select p.contents, u.username as saidBy from posts as p
    join users as u ON p.contents = u.id
  */

  db("posts as p")
    .join("users as u", "p.user_id", "u.id")
    // syntax = the table you're joining to and the two columns you are joining
    .select("p.contents", "u.username as saidBy")
    .where({ user_id: req.params.id })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error, "error");
      res.status(500).json({ error: "I did it again" });
    });
});

module.exports = router;

// function addUser(user) {
//   return db("users").insert(user, "id");
// }

// separation of concerns principle = Not wanting everything in one place
// connected to the "single responsibility principle"
// a unit should only have one reason to change
