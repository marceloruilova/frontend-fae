export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.jwt_token) {
      return { Authorization: user.jwt_token };
    } else {
      return {};
    }
  }