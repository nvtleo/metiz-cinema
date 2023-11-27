import React from 'react';
import { logIn } from '../../service/user.service';
import type { Tlogin } from "../../service/user.service"
import { Button, Checkbox, Form, Input } from 'antd';
function Login() {
    const onFinish = (values: Tlogin) => {
        console.log('Success:', values);
        logIn(values)
        alert("Đăng nhập thành công");
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 1000, marginTop: "5rem" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<Tlogin>
                    label="Tài khoản"
                    name="taiKhoan"
                    rules={[
                        {
                            type: "string",
                            message: "username must be a Email"
                        },
                        { required: true, message: "Tài khoản không được bỏ trống" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Tlogin>
                    label="Mật khẩu"
                    name="matKhau"
                    rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        style={{ backgroundColor: "#4096ff" }} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login