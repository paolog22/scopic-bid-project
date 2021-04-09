import UnauthorizedException from "App/Exceptions/UnauthorizedException"

export class AuthRepository {
    private readonly users = [
        {
            id: 1,
            username: 'user1'
        },
        {
            id: 2,
            username: 'user2'
        }
    ]

    async authenticate (username: string) {
       const user = this.users.find(i => i.username == username)
       if (!user) {
        throw new UnauthorizedException('Invalid credential')
       }

       return user
    }
}