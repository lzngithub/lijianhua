import React from 'react'
import { 
    Card,
    Form,
    Row,
    Space,
    Button,
    Table,
    Col,
    Select,
    Input,
    Modal,
    message,
} from 'antd'
import {
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'

import UpdataUser from './Updateuser.jsx'

const {$http} = React;
const searchItem = [
    { key: 'username', name: 'username', label: '用户名', defaultValue: null, type: 'input', placeholder: '请输入' },
    { key: 'email', name: 'email', label: '邮箱', defaultValue: null, type: 'input', placeholder: '请输入' },
    { key: 'sex', name: 'sex', label: '性别', defaultValue: -1, type: 'select', options: [
      { value: -1, label: '不限' },
      { value: 0, label: '男' },
      { value: 1, label: '女'}
    ], placeholder: '请选择' }
  ]
class User extends React.Component {
    constructor () {
        super();
        this.state = {
            loading: false,
            columns: [
                { title: '用户名', dataIndex: 'username' },
                { title: '性别', dataIndex: 'sex', render: (text, record) => {
                    return (
                      <span>{text === 0 ? '男' : '女'}</span>
                    )
                  }},
                  { title: '联系方式', dataIndex: 'phone' },
                  { title: '邮箱地址', dataIndex: 'email' },
                  { title: '创建时间', dataIndex: 'createDate' },
                  { title: '操作', key: 'action', render: (text,record) => {
                      return (
                          <React.Fragment>
                              <Button type="link" onClick={(f)=>this.onEdit(record,f) }><EditOutlined></EditOutlined>编辑</Button>
                              <Button type="link" onClick={()=>this.onDelete(record)}><DeleteOutlined></DeleteOutlined>删除</Button>
                          </React.Fragment>
                      )
                  } }
            ],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            },
            userTableData: [],
            loading: false,
            modalVisible: false,
            moalType: 'add'
        }
    }
    componentDidMount() {
        console.log(1111111111111111111111111111111);
        this.getUserList();
    }
    onEdit(record,f){
        console.log(record);
        console.log(f);
        this.setState({
            modalVisible: true,
        });
    }
    onDelete = (record) => {
        console.log(record);
        Modal.confirm({
            title: '删除用户',
            icon: <ExclamationCircleOutlined />,
            content: (
                <span>确认删除用户<span className="text-light-red">{record.username}</span>吗？</span>
            ),
            onOk: () => {
                $http.delete('user/delete', { data: {id: record.id} }).then(res => {
                    message.success('删除成功')
                    this.getUserList()
                  })
            }
        });

    }
    getUserList = () => {
        console.log(222);
        const params = {
            page: 1,
            pageSize: 10,
        }
        $http.get('user/list', { params }).then(res => {
            const { list, ...pagination } = res;
            this.setState({
                userTableData: list,
                pagination: {
                    current: pagination.page,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                },
                loadign: false,
            });
        });
    }
    onModalCancel = () => {
        this.setState({modalVisible: false})
      }
    render () {
        const {
            columns,
            userTableData,
            loading,
            pagination,
            modalType,
            modalVisible
        } = this.state;
        const getFields = () => {
            const children = searchItem.map((item, index) => (
                <Col span={6} key={index}>
                    <Form.Item name={item.name} label={item.label} initialValue={item.initialValue}>
                        {
                            item.type === 'input' ? 
                            <Input placeholder={item.placeholder}></Input> : 
                            <Select>
                                {
                                    item.options.map((item1,index1) => (
                                        <Select.Option key={index1} value={item1.value}>{item1.label}</Select.Option>
                                    ))
                                }
                            </Select>
                        }
                    </Form.Item>
                </Col>
            ));
            return children;
        }
        const serchControl = (
            <Col span={6}>
                <Space>
                    <Button type="primary">查询</Button>
                    <Button>重置</Button>
                </Space>
            </Col>
        )
        return (
            <Card title="用户列表">
                <Form>
                    <Row gutter={24}>
                        {getFields()}
                        {serchControl}
                    </Row>
                </Form>
                <Space>
                    <Button type="primary"> <PlusOutlined/>添加</Button>
                    <Button type="primary"><DeleteOutlined></DeleteOutlined>批量删除</Button>
                </Space>
                <Table columns={columns} loading={loading} dataSource={userTableData} pagination={pagination}></Table>
                <UpdataUser ModalType={modalType} visible={modalVisible} onCancel={this.onModalCancel}></UpdataUser>
            </Card>
        )
    }
}

export default User;