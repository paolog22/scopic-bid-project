import Factory from '@ioc:Adonis/Lucid/Factory'
import Antique from 'App/Models/Antique'
import Bid from 'App/Models/Bid'

const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

const antiques = [
  'https://www.michaelbackmanltd.com/wp-content/archived-images/IMG_0183-450x600.jpg',
  'https://i5a2y1wi06-flywheel.netdna-ssl.com/wp-content/uploads/5422-India-Small-Bronze-6.jpg',
  'https://i5a2y1wi06-flywheel.netdna-ssl.com/wp-content/uploads/5422-India-Small-Bronze-3.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCO6Eu1PE2x-Ng4Tg59kMCq63AywRE4n0RpmjhP53qsS4a_46LbxZfVU1uI0HnRMRMegI&usqp=CAU',
  'https://i.pinimg.com/originals/91/99/4b/91994b36467efbd5d932c8ac497d2aec.jpg',
  'https://images-na.ssl-images-amazon.com/images/I/71CTw-CveCL._SX425_.jpg',
  'https://i.pinimg.com/originals/d2/9d/a4/d29da4e2b158b5f42b8379bd67ebe2c7.jpg',
  'https://www.thesprucecrafts.com/thmb/tjxB8oMzwmzXYsd4XAI2UsYA0Bc=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/henry-graves-watch-5a83732fc5542e00377fbe48.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAX-USW1UFDhmrbf8z5srQdmTYH2rrA3BWLC6fUqpiAqJivT5IWh46KePz1FPH8tlVwnI&usqp=CAU',
  'https://i.pinimg.com/originals/c1/dd/17/c1dd1724e4c3868c7e867ba69c5c1b67.jpg',
  'https://i.pinimg.com/originals/d4/a4/88/d4a48867a35dc41e80b75c21d7fc475f.jpg'
]

export const BidFactory = Factory
  .define(Bid, ({ faker }) => {
    return {
        id: faker.datatype.uuid(),
        userId: faker.datatype.uuid(),
        bid: Math.ceil(getRandomNumber(1000, 10000)),
    }
  })
  .build()

export const AntiqueFactory = Factory
  .define(Antique, ({ faker }) => {
    return {
        id: faker.datatype.uuid(),
        name: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        image: antiques[Math.floor(getRandomNumber(1, antiques.length))],
        basePrice: Math.ceil(getRandomNumber(1000, 10000)),
        expiration: faker.date.future(),
    }
  })
  .relation('bids', () => BidFactory)
  .build()

