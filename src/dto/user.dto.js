class UserDto {
    constructor(user){
        this.full_name = `${user.first_name} ${user.last_name}`
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.role = "user"
    }
}

module.exports = {UserDto}