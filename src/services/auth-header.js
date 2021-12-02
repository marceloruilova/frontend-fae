export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
    if (user && user.jwt_token) {
      return { Authorization: user.jwt_token };
    } else {
      return {};
    }
  }