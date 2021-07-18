import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'Juan') alert(`Submitting Name ${username}`);
    else alert(`Submitting password ${password}`);
  };
  return (
    <div className="login-box-container">
      <div className="login-box-row">
        <div>Imagen</div>
        <div>Login</div>
        <form className="row" onSubmit={handleLogin}>
          <div>
            <label>UserName:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;
