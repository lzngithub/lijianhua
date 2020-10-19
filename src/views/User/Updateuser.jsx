import React from 'react'
import { Form, Modal, Button, Input, Space, Select, Checkbox } from 'antd'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
}
const roleOptions = [
  { label: '管理员', value: 1 },
  { label: '超级管理员', value: 0 },
  { label: '纠错员', value: 2 },
  { label: '采购员', value: 3 },
  { label: '推销员', value: 4 },
  { label: '运营人员', value: 5 },
  { label: '文章撰写员', value: 6 }
]
const authOptions = [
  { label: '内容系统', value: 1 },
  { label: '社区系统', value: 0 },
  { label: '用户', value: 2 },
  { label: '角色', value: 3 },
  { label: '评论审核', value: 4 },
  { label: '采购', value: 5 },
  { label: '系统设置', value: 6 },
  { label: '发送邮件', value: 7 },
  { label: '发送短信', value: 8 },
  { label: '审核', value: 9 }
]

class UpdateRole extends React.PureComponent {

  formRef = React.createRef()

  render() {
    const { visible, onSave, onCancel, modalForm } = this.props
    return (
      <Modal title={modalForm ? '编辑角色' : '创建角色'} footer={null} visible={visible} onOk={onSave} onCancel={onCancel}>
          <Form name="control-ref" ref={this.formRef} onFinish={onSave}>

          </Form>
      </Modal>
    )
  }
}

export default UpdateRole