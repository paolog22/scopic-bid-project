import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PaginateAntique } from 'App/Domain/Antique/dto/paginate.dto';
import { AntiqueRepository } from 'App/Domain/Antique/repository/antique.repo'
import { AntiqueService } from 'App/Domain/Antique/service/bid.service';
import Bid from 'App/Models/Bid';


export default class AntiquesController {
    private readonly antiqueRepo: AntiqueRepository;
    private readonly antiqueService: AntiqueService; 

    constructor () {
        this.antiqueRepo = new AntiqueRepository()
        this.antiqueService = new AntiqueService()
    }

    public async index ({ request }: HttpContextContract) {
        const query = request.get() as PaginateAntique
        return await this.antiqueRepo.paginate(query.q, query.page, query.limit)
    }

    public async getAntique ({ params }: HttpContextContract) {
        const {id} = params
        const antique = await this.antiqueRepo.getById(id)
        await antique.preload('bids')
        
        return antique
    }

    public async bid ({ params, request }: HttpContextContract) {
        const {id} = params
        const amount = request.input('amount')
        const user = request.input('user')
        
        return this.antiqueService.bid(user, amount, id)
    } 
}
