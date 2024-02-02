"use client";
import { Modal, Form, Button, Space, Select, Switch } from "antd";
import React from "react";
import { customAxiosPost } from "@/helpers/custom-axios";
import API_URL from "@/helpers/api-url";
type DataGridProps = {
  open: boolean;
  type: "create" | "edit" | "delete";
  onCancel: () => void;
  onOk: () => void;
  dataCreate: {
    groupList: object[];
    commandList: object[];
  };
  dataEdit: {
    id: string;
    group_id: number;
    group_name: string;
    command_id: number;
    command_name: string;
    is_active: boolean;
  };
  openNotificationWithIcon: (type: NotificationType, data: string) => void;

  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};
type NotificationType = "success" | "info" | "warning" | "error";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const ModalCRUD: React.FC<DataGridProps> = ({
  open,
  type,
  onOk,
  onCancel,
  setReload,
  dataEdit,
  openNotificationWithIcon,
  dataCreate,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    // let groupName = dataCreate.groupList.filter(
    //   (item) => item.id === values.group_id
    // );
    console.log(values);
    // if (type == "create") {
    //   let urlAdd = API_URL.TASKS.ADD_TASK;
    //   let res: { error: boolean; msg: string } = await customAxiosPost(
    //     urlAdd,
    //     values
    //   );
    //   if (res.error === false) {
    //     openNotificationWithIcon("success", res.msg);
    //     setReload((previous) => {
    //       return !previous;
    //     });
    //   } else {
    //     openNotificationWithIcon("error", res.msg);
    //   }
    // } else {
    //   let urlEdit = API_URL.GROUPS.UPDATE_GROUP;
    //   let res: { error: boolean; msg: string } = await customAxiosPost(
    //     urlEdit,
    //     { ...values, id: dataEdit.id }
    //   );
    //   if (res.error === false) {
    //     openNotificationWithIcon("success", res.msg);
    //     setReload((previous) => {
    //       return !previous;
    //     });
    //   } else {
    //     openNotificationWithIcon("error", res.msg);
    //   }
    // }
  };
  let title = type == "create" ? "Create Group" : "Edit Group";

  // form.setFieldValue("group_name", dataEdit.group_name);
  // form.setFieldsValue({
  //   group_filter: dataEdit.group_filter,
  // });
  return (
    <Modal title={title} onCancel={onCancel} open={open}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="group_id" label="Select Group" required>
          <Select options={dataCreate.groupList}></Select>
        </Form.Item>
        <Form.Item name="command_id" label="Select Command" required>
          <Select options={dataCreate.commandList}></Select>
        </Form.Item>
        <Form.Item name="is_active" label="Active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCRUD;
