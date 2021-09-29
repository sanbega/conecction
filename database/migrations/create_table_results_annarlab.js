exports.up = function (knex) {
    return knex.schema.createTable('vehicles', function (table) {
        table.increments()
        table.string('plate').notNullable().unique()
        table.string('name')
        table.string('type_car')
        table.string('model')
        table.string('brand')
        table.integer('year')
        table.string('user_name')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


