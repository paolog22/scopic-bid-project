import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { AntiqueFactory } from 'Database/factories'

export default class AntiqueSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    for(let i = 0; i <= 30; i++) {
      await AntiqueFactory.create()
    }
    
  }
}
