import { Label, Row, Col, FormGroup, Input, Form, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const request = {
      username: data.username,
      password: data.password,
    };
    axios
      .post("http://localhost:3000/login/", request)
      .then((result) => {
        alert("Exito");
      })
      .catch((error) => alert("Error"));
  };
  return (
    <div className="login-box-container">
      <div className="container" style={{ width: "26%" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="formborder">
              <FormGroup>
                <Label htmlFor="temperatura">Imagen</Label>
                <Label htmlFor="temperatura">Login</Label>
                <Label htmlFor="temperatura">Usuario</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="formborder">
            <Col xs="5">
              <div htmlFor="username">USERNAME:</div>
            </Col>
            <Col xs="7">
              <FormGroup>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  {...register("username")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="formborder">
            <Col xs="5">
              <div htmlFor="username">PASSWORD:</div>
            </Col>
            <Col xs="7">
              <FormGroup>
                <Input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...register("password")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row></Row>
          <Row className="formborder">
            <Col xs="2">
              <Button type="submit" value="submit" color="primary">
                Ingresar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Login;
