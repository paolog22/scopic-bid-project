import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { AuthRepository } from "App/Domain/Auth/repository/auth.repo"

export default class AuthController {
    private readonly authRepo: AuthRepository

    constructor () {
        this.authRepo = new AuthRepository()
    }

    public async index ({ request }: HttpContextContract) {
         const username = request.input('username')

        return this.authRepo.authenticate(username)
    }
}
