import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Antiques extends BaseSchema {
  protected tableName = 'antiques'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name')
      table.string('description')
      table.string('image')
      table.float('base_price')
      table.dateTime('expiration')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
