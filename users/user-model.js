const db = require("../data/db-config.js");

module.exports = {
  all,
  findById,
  add,
  update,
  findUserPosts,
  remove
};

function all() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function add(user) {
  return db("users").insert(users, "id");
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function findUserPosts(id) {
  return db("posts as p")
    .join("users as u", "u.id", "p.id")
    .select("p.contents", "u.username as saidBy")
    .where("user_id", id);
}
