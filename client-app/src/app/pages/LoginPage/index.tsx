import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import "./style.css";

export default function LoginPage() {
  const onFinish = (values: any) => {
    console.log("dados de login ", values);
  };

  return (
    <div className="loginContainer">
      <Form
        className="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Por favor insira o nome do Usuario" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="" />}
            placeholder="Nome do Usuario"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor insira o Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Typography.Link className="loginFormForgot" href="">
            Esqueceu sua senha?
          </Typography.Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className='loginFormButton'
          >
            Log in
          </Button>
          Não tens uma conta?{" "}
          <Typography.Link href="">Regista-te!</Typography.Link>
        </Form.Item>
      </Form>
    </div>
  );
}
