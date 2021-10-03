import { Table, Space, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';
import './button.css';

export default function Customers() {
    const [dataSource, setdataSource] = React.useState([]);
    const [modalVisibilty, setmodalVisibilty] = React.useState(false);
    const [editmodalVisibilty, seteditmodalVisibilty] = React.useState(false);
    const [editFormID, seteditFormID] = React.useState('');
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const { confirm } = Modal;


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        axios.post('http://arsalon.tech:5000/Customers/addCustomer', {
            "name": values.name,
            "email": values.email,
            "password": values.confirm,
            "number": values.phone
        })
        .then(function (response) {
            if (response.data.status === "Record added") {
                alert("Membership Plan Added!");
                form.resetFields();
                setmodalVisibilty(false);
            }
            else {
                alert("Membership Plan Not Added!");
            }
        })
    };
    const onFinishedit = async(values) => {
        //console.log('Received values of form: ', values);
        await axios.put(`http://arsalon.tech:5000/Customers/editCustomer/${editFormID}`, {
            name: values.editname,
            email: values.editemail,
            phone: values.editphone,
            password: values.confirmedit
        })
        .then(function (response) {
            console.log(response)
            if (response.data.message === "Changes Saved"){
                alert("Customer Updated!");
                form.resetFields();
                seteditmodalVisibilty(false);
            }
            else{
                alert("Customer Not Updated!");
            }
        })
        editForm.resetFields();
        seteditmodalVisibilty(false);
        seteditFormID('');
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
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            +92
        </Form.Item>
    );
    function showConfirm(record) {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Doing this will delete this customer permanently!',
            async onOk() {
                var res = await axios.delete(`http://arsalon.tech:5000/Customers/deleteCustomer/${record.key}`);
                alert(res.data.message);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'email',
        },
        {
            title: 'Join Date',
            dataIndex: 'JoinDate',
            key: 'join',
        },
        {
            title: 'Phone',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="default"
                        style={{ backgroundColor: "#1F2937", color: 'white' }}
                        onClick={() => filleditform(record)}>
                        Edit
                    </Button>
                    <Button onClick={()=>showConfirm(record)} type="default"
                        style={{ backgroundColor: "#1F2937", color: 'white' }}>Delete</Button>
                </Space>
            ),
        },
    ];
    const filleditform = (record) => {
        console.log(record);
        editForm.setFieldsValue({
            editname: record.name,
            editemail: record.Email,
            editphone: record.number
        });
        seteditmodalVisibilty(true);
        seteditFormID(record.key);
    };
    React.useEffect(() => {
        axios.get(`http://3.138.67.96:5000/Customers/CustomersData`)
            .then(res => {
                const result = res.data;
                setdataSource(result);
            })
    }, [dataSource])

    //const myForm = newCustomerForm;
    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                </div>
            </header>
            <div style={{ float: 'right' }}>
                <Button
                    type="default"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "#1F2937", color: 'white', margin: 20 }}
                    onClick={() => setmodalVisibilty(true)}
                >
                    Add a Customer
                </Button>
            </div>
            <div className="">
                <Table dataSource={dataSource} columns={columns} style={{ margin: '20px' }} />
            </div>
            <Modal
                title="Add new Customer"
                centered
                visible={modalVisibilty}
                onCancel={() => setmodalVisibilty(false)}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Full Name"
                        tooltip="Please enter your full name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your full name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Edit Customer"
                centered
                visible={editmodalVisibilty}
                onCancel={() => seteditmodalVisibilty(false)}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    form={editForm}
                    name="edit"
                    onFinish={onFinishedit}
                    scrollToFirstError
                >
                    <Form.Item
                        name="editname"
                        label="Edit Full Name"
                        tooltip="Please enter your full name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your full name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="editemail"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="editpassword"
                        label="Enter New Password"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmedit"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: false,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('editpassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="editphone"
                        label="Edit Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
};
