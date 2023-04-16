export default class UserDTO {
  static getTokenDTO = (user) => {
    return {
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      id: user._id,
      email: user.email,
      avatar: user.avatar,
    };
  };
}
