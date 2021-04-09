import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bids extends BaseSchema {
  protected tableName = 'bids'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('antique_id').unsigned().references('id').inTable('antiques')
      table.string('user_id')
      table.float('bid')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
