exports.up = function(knex, Promise) {
    return knex.schema.createTable("clucks", t => {
      t.bigIncrements("id");
      t.string("username");
      t.text("content");
      t.text("image_url");
      t.timestamp("created_at").defaultTo(knex.fn.now());
      t.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("clucks");
  };
  
