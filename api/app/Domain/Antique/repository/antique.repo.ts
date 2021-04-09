import NotFoundException from "App/Exceptions/NotFoundException";
import Antique from "App/Models/Antique";

export class AntiqueRepository {
    async paginate (query: string = '', page: number = 1, limit: number = 10) {
        return await Antique.query().where('name', 'LIKE', `%${query}%`).paginate(page, limit)
    }

    async getById (id: string) {
        return Antique.findByOrFail('id', id)
        .then(response => response)
        .catch(() => {
            throw new NotFoundException('Not Found')
        })
    }
}