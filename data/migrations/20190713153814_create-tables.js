exports.up = function(knex) {
  return (
    knex.schema
      // Users Table
      .createTable("users", tbl => {
        tbl.increments();
        tbl
          .text("username", 128)
          .unique()
          .notNullable();
      })
      // Posts Table
      .createTable("posts", tbl => {
        tbl.increments();
        tbl.text("contents");

        // foreign key
        tbl
          .integer("user_id") // the foreign key must be the same TYPE as the primary key it references.

          .unsigned() // always include  unsigned() when referencing an integer primary key

          .notNullable()
          .references("id")
          .inTable("users")
          // CASCADE
          .onUpdate("CASCADE") // What happens if the value of the primary key changes? With CASCADE all of the records will update according to the update

          .onDelete("CASCADE"); // what happens if the primary key table row is deleted? (would delete all orders for the primary key)
        //RESTRICT, DO NOTHING, SET NULL, CASCADE. FOR DELETE RECOMMEND USING RESTRICT NOT CASCADE. This is like having another fail safe before accidentally deleting all your files.

        // if you need it to connect to other tables you would add another column defined in the same way with the matching reference
      })
  );
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
