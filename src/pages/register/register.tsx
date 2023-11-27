import React, { useState } from 'react';
import type { Tbody } from "../../service/user.service"
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../service/user.service';


const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/login`);
    };
    const onFinish = (values: Tbody) => {
        console.log('Received values of form: ', values);
        alert(" Bạn đã đăng ký thành công")
        signUp(values)
        // handleNavigate()
    };

    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };
    return (
        <div >
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                style={{ maxWidth: 1000, marginTop: "5rem", alignItems: "center" }}
                scrollToFirstError
            >
                <Form.Item
                    name=" email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'string',
                            message: 'Email không hợp lệ',
                        },
                        {
                            required: true,
                            message: 'Email không được bỏ trống',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name=" taiKhoan"
                    label="Tài khoản"
                    rules={[
                        {
                            type: "string",
                        },
                        {
                            required: true,
                            message: 'Tài khoản không được bỏ trống',
                        },
                        {
                            whitespace: true,
                            pattern: /^[a-zA-Z0-9.]+$/,
                            message: "Tài khoản không hợp lệ"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="matKhau"
                    label="Mật khẩu"
                    rules={[
                        {
                            type: "string",
                            message: "password must be have number and string"
                        },
                        {
                            required: true,
                            message: 'Mật khẩu không được bỏ trống',
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Xác nhận lại mật khẩu"
                    dependencies={['matKhau']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Không được bỏ trống',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('matKhau') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name=" hoTen"
                    label="Họ và tên"
                    tooltip="What do you want others to call you?"
                    rules={[{
                        type: "string",
                        message: "name must be string"
                    },
                    {
                        required: true,
                        message: 'Please input your nickname!',
                    },
                    {
                        whitespace: true,
                        pattern: /^[a-zA-Z]+$/,
                        message: "Tên không hợp lệ"
                    }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="maNhom"
                    label="maNhom"
                    rules={[
                        { type: "string" },
                        {
                            required: true,
                            message: 'Please input your maNhom!',
                        },
                        {
                            whitespace: true,
                            pattern: /^[a-zA-Z]+$/,
                            message: "maNhom không hợp lệ"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name=" soDt"
                    label="Số điện thoại"
                    rules={[

                        { pattern: /^[0-9]{8,}$/, message: "Số điện thoại không hợp lệ" },
                        { required: true, message: 'Số điện thoại không được bỏ trống' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        style={{ backgroundColor: "#4096ff" }}
                        type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;