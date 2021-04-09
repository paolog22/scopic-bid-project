import NotValidBidException from "App/Exceptions/NotValidBidException";
import Bid from "App/Models/Bid";
import { AntiqueRepository } from "../repository/antique.repo";

export class AntiqueService {
    private readonly antiqueRepo: AntiqueRepository;
    
    constructor () {
        this.antiqueRepo = new AntiqueRepository()
    }

    private async validateBid (bid: number, id: string) {
        const bids = await Bid.query().where('antiqueId', id)
        const maxbid = Math.max(...bids.map(i => i.bid))
        if (maxbid > bid) {
            throw new NotValidBidException(`Bid ${bid} not valid`)
        }

        return true
    }

    public async bid(user: string, amount: number, antiqueId: string) {
        try {
            const bid = new Bid()
            const antique = await this.antiqueRepo.getById(antiqueId)
            await this.validateBid(amount, antiqueId)

            if (antique) {
                bid.userId = user
                bid.bid = amount

                await antique.related('bids').save(bid)
            }

            return bid
        } catch (e) {
            throw e
        }
    }
}