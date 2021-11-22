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
      nombre: data.username,
      evolucion: [{ id: "place" }],
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
      <div style={{border:"4px solid"}}>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Row>
          <Col>
            <FormGroup>
              <Label htmlFor="temperatura">Imagen</Label>
              <Label htmlFor="temperatura">Login</Label>
              <Label htmlFor="temperatura">Usuario</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
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
        <Row>
          <Col >
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
        <Row></Row>
        <Button type="submit" value="submit" color="primary">
          Ingresar
        </Button>
      </Form>
      </div>
      </div>
  );
}

export default Login;
