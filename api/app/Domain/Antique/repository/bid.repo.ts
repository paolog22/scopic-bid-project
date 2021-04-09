import Bid from "App/Models/Bid";

export class BidRepository {
    async paginate (query: string = '', page: number = 1, limit: number = 10) {
        return await Bid.query().where('name', 'LIKE', `%${query}%`).paginate(page, limit)
    }
}