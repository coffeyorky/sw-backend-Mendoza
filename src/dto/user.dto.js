class UserDto {
  static getUserTokenFrom = (user) => {
    return {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role || "user"
    };
  };
}

module.exports = UserDto;
