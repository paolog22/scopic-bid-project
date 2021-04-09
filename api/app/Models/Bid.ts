import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Bid extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public antiqueId: string

  @column()
  public userId: string

  @column()
  public bid: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (bid: Bid) {
    bid.id = uuid()
  }
}
