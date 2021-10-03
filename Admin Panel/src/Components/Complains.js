import { Table, Space, Menu, Dropdown, Modal, Button, Form,Input } from 'antd';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';

export default function Complains() {
    const { confirm } = Modal;
    const [editmodalVisibilty, seteditmodalVisibilty] = React.useState(false);
    const [form] = Form.useForm();

    const onFinishedit = (values) => {
        console.log('Received values of form: ', values);
        form.resetFields();
        seteditmodalVisibilty(false);
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

    function showConfirm() {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }, 
        });
    };
    const dataSource = [
        {
            key: '1',
            customer: 'Mark',
            salon: "Jason's Salon",
            subject: 'Un proffesion behaviour from the staff',
        },
    ];

    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Salon Name',
            dataIndex: 'salon',
            key: 'salon',
        },
        {
            title: 'Complain Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Status',
            key: 'salons',
            render: (text, record) => (
                <Dropdown overlay={<Menu>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            Pending
                        </a>
                    </Menu.Item>
                    <Menu.Item >
                        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                            Anwsered
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                            Closed
                        </a>
                    </Menu.Item>
                </Menu>}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="">
                        Select Status <DownOutlined />
                    </a>
                </Dropdown>

            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={showConfirm} type="default"
                        style={{ backgroundColor: "#1F2937", color: 'white' }}>Delete</Button>
                </Space>
            ),
        },
    ];
    const filleditform = (record)=>{
        console.log(record)
        form.setFieldsValue({
            editname: record.name,
            editemail: record.Email,
            editphone: record.number
        });
        seteditmodalVisibilty(true);
    };
    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Complains</h1>
                </div>
            </header>
            <div className="">
                <Table dataSource={dataSource} columns={columns} style={{ margin: '20px' }} />
            </div>
            
            <Modal
                title="Edit Customer"
                centered
                visible={editmodalVisibilty}
                onCancel={() => seteditmodalVisibilty(false)}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    form={form}
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