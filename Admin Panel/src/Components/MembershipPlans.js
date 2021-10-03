import { Table, Space, Button, Modal, Input, Form } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';
export default function Plans() {
    const [editFormID, seteditFormID] = React.useState('');
    const [value, setValue] = React.useState('');
    const [modalVisibilty, setmodalVisibilty] = React.useState(false);
    const [editmodalVisibilty, seteditmodalVisibilty] = React.useState(false);
    const [form] = Form.useForm();
    const [dataSource, setdataSource] = React.useState([]);

    const onFinish = (values) => {
        axios.post('http://arsalon.tech:5000/MemPlans/addMembershipPlan', {
            name: values.name,
            duration: values.duration,
            price: values.price
        })
        .then(function (response) {
            if (response.data.status === "Record added"){
                alert("Membership Plan Added!");
                form.resetFields();
                setmodalVisibilty(false);
            }
            else{
                alert("Membership Plan Not Added!");
            }
        })
    };
    const onFinishedit = async (values) => {
        await axios.put(`http://arsalon.tech:5000/MemPlans/editPlan/${editFormID}`, {
            name: values.editname,
            duration: values.editduration,
            price: parseInt(values.editprice)
        })
        .then(function (response) {
            if (response.data.message === "Changes Saved"){
                alert("Membership Plan Updated!");
                form.resetFields();
                seteditmodalVisibilty(false);
            }
            else{
                alert("Membership Plan Not Updated!");
            }
        })
        form.resetFields();
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

    const FilterByNameInput = (
        <>
            <h2>Name</h2>
            <Input
                placeholder="Plan Name"
                value={value}
                onChange={e => {

                }}
                style={{ width: 200, marginRight: -200 }}
            />
        </>
    );
    const columns = [
        {
            title: FilterByNameInput,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Plan Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Plan Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Active Salons',
            dataIndex: 'salons',
            key: 'salons',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="default"
                        style={{ backgroundColor: "#1F2937", color: 'white' }}
                        onClick={() => filleditform(record)}
                    >
                        Edit
                    </Button>
                    <Button onClick={()=>showConfirm(record)} type="default"
                        style={{ backgroundColor: "#1F2937", color: 'white' }}>Delete</Button>
                </Space>
            ),
        },
    ];
    const { confirm } = Modal;

    function showConfirm(record)  {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Doing this will membership plan permanently!',
            async onOk() {
                var res = await axios.delete(`http://arsalon.tech:5000/MemPlans/deletePlan/${record.key}`);
                alert(res.data.message);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const filleditform = (record) => {
        form.setFieldsValue({
            editname: record.name,
            editduration: record.duration,
            editprice: record.price
        });
        seteditFormID(record.key);
        seteditmodalVisibilty(true);
    };
    React.useEffect(() => {
        axios.get(`http://arsalon.tech:5000/MemPlans/memPlans`)
            .then(res => {
                const result = res.data;
                setdataSource(result);
            })
    }, [dataSource]);

    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Membership Plans</h1>
                </div>
            </header>
            <div style={{ float: 'right' }}>
                <Button
                    type="default"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "#1F2937", color: 'white', margin: 20 }}
                    onClick={() => setmodalVisibilty(true)}
                >
                    Create New Plan
                </Button>
            </div>
            <div className="">
                <Table dataSource={dataSource} columns={columns} style={{ margin: '20px' }} />
            </div>
            <Modal
                title="Add new Plan"
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
                        label="Enter Plan Name"
                        tooltip="Please enter the membership plan name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the membership plan name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the plan price!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="duration"
                        label="Plan Duration"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the plan duration!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Edit Membership Plan"
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
                        label="Edit Plan Name"
                        tooltip="Please enter the membership plan name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the membership plan name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="editprice"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the plan price!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="editduration"
                        label="Plan Duration"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the plan duration!',
                            },
                        ]}
                    >
                        <Input />
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