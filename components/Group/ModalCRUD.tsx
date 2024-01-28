"use client";
import { Modal, Form, Input, Button, Space, Alert, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { customAxiosPost } from "@/helpers/custom-axios";
import API_URL from "@/helpers/api-url";
import { GROUP_FILTER } from "@/types/group";

type DataGridProps = {
  open: boolean;
  type: "create" | "edit" | "delete";
  onCancel: () => void;
  onOk: () => void;
  dataEdit: {
    id: number;
    group_name: string;
    group_filter: GROUP_FILTER[];
  };
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
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, data: string) => {
    api[type]({
      message: type,
      description: data,
      placement: "bottomRight",
    });
  };
  const onFinish = async (values: any) => {
    if (type == "create") {
      let urlAdd = API_URL.GROUPS.ADD_GROUP;
      let res: { error: boolean; msg: string } = await customAxiosPost(
        urlAdd,
        values
      );
      if (res.error === false) {
        openNotificationWithIcon("success", res.msg);
        setReload((previous) => {
          return !previous;
        });
      } else {
        openNotificationWithIcon("error", res.msg);
      }
    } else {
      let urlEdit = API_URL.GROUPS.UPDATE_GROUP;
      let res: { error: boolean; msg: string } = await customAxiosPost(
        urlEdit,
        { ...values, id: dataEdit.id }
      );
      if (res.error === false) {
        openNotificationWithIcon("success", res.msg);
        setReload((previous) => {
          return !previous;
        });
      } else {
        openNotificationWithIcon("error", res.msg);
      }
    }
  };
  let title = type == "create" ? "Create Group" : "Edit Group";

  form.setFieldValue("group_name", dataEdit.group_name);
  form.setFieldsValue({
    group_filter: dataEdit.group_filter,
  });
  return (
    <Modal title={title} onCancel={onCancel} open={open}>
      {contextHolder}
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
        <Form.Item
          label="Group name"
          name="group_name"
          rules={[{ required: true, message: "Please input your Group name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.List
          name="group_filter"
          rules={[
            {
              validator: async (_, fields) => {
                if (!fields || fields.length < 1) {
                  return Promise.reject(new Error("At least 1 passengers"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <p className="dark:text-white text-sm">Enter your filter here:</p>

              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "field"]}
                    rules={[{ required: true, message: "Missing field" }]}
                  >
                    <Input placeholder="Field" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "operator"]}
                    rules={[{ required: true, message: "Missing operator" }]}
                  >
                    <Input placeholder="Operator" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    rules={[{ required: true, message: "Missing value" }]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
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
