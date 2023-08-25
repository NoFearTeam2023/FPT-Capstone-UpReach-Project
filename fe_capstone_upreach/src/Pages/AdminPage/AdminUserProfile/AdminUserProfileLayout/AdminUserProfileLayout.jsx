import React from "react";
import "./AdminUserProfileLayout.css";
import {
  Table,
  Popconfirm,
  Form,
  Input,
  Typography,
  message,
  Spin,
  Avatar,
} from "antd";
import default_img from "../../../../Assets/Image/Default/DefaultImg.jpg";

import {
  DeleteOutlined,
  UserDeleteOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import axios from "axios";

const AdminUserProfileLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [editingId, setEditingId] = React.useState("");
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [force, setForce] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listClient, setListClient] = React.useState([]);

  const check = async () => {
    if (editingId !== "") {
      const row = await form.validateFields();

      if (
        listClient?.some(
          (item) =>
            item?.clientId == editingId && item?.fullName == row?.fullName
        ) &&
        listClient?.some(
          (item) => item?.clientId == editingId && item?.brand == row?.brand
        ) &&
        listClient?.some(
          (item) => item?.clientId == editingId && item?.email == row?.email
        ) &&
        listClient?.some(
          (item) => item?.clientId == editingId && item?.phone == row?.phone
        ) &&
        listClient?.some(
          (item) => item?.clientId == editingId && item?.address == row?.address
        )
      ) {
        return false;
      } else return true;
    }
  };

  const isEditing = (record) => {
    return record?.clientId === editingId;
  };

  const tags = [
    {
      title: "Avatar",
      dataIndex: "image",
      width: "4%",
      render: (_) => {
        return (
          <Avatar
            src={
              <img
                src={_ || default_img}
                alt="avatar"
                onError={(e) => {
                  e.target.src = default_img;
                }}
              />
            }
            size={45}
          />
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      width: "17%",
      editable: true,
    },
    {
      title: "Brand Name",
      dataIndex: "brand",
      width: "13%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "19%",
      editable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      width: "11%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "20%",
      editable: true,
    },

    {
      title: <EditOutlined />,
      dataIndex: "edit",
      width: "11%",
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography.Link
              onClick={() => handleSave(record?.clientId)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              open={openConfirm}
              title="Sure to cancel?"
              onCancel={cancel}
              onConfirm={ok}
            >
              <p
                style={{ cursor: "pointer", paddingTop: "3px  " }}
                onClick={async () => {
                  if (await check()) {
                    // console.log(true);
                    setOpenConfirm(true);
                  } else {
                    setEditingId("");
                  }
                }}
              >
                Cancel
              </p>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingId !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: <UserDeleteOutlined />,
      dataIndex: "lock",
      width: "5%",
      render: (_, record) =>
        listClient?.length >= 1 && record?.isAccept == false ? (
          <Popconfirm
            title="Sure to unlock account?"
            onConfirm={() => handleAllow(record?.clientId)}
          >
            <LockOutlined />
          </Popconfirm>
        ) : (
          <Popconfirm
            title="Sure to lock account?"
            onConfirm={() => handleLock(record?.clientId)}
          >
            <UnlockOutlined />
          </Popconfirm>
        ),
    },
  ];

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "number" ? (
        <Input type="number" maxLength={11} style={{ width: "160px" }} />
      ) : (
        <Input />
      );

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                // message: `Error!`,
                message: `Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const edit = (record) => {
    form.setFieldsValue({
      fullName: "",
      brand: "",
      email: "",
      phone: "",
      address: "",
      ...record,
    });
    setEditingId(record?.clientId);
  };

  const cancel = () => {
    setOpenConfirm(false);
  };
  const ok = () => {
    setEditingId("");
    setOpenConfirm(false);
  };

  const handleSave = async (clientId) => {
    setIsLoading(true);
    try {
      const row = await form.validateFields();
      const newInfoClient = [...listClient];
      const index = newInfoClient?.findIndex(
        (item) => clientId === item?.clientId
      );
      if (index > -1) {
        const item = newInfoClient[index];
        newInfoClient?.splice(index, 1, {
          ...item,
          ...row,
        });
        setListClient(newInfoClient);
        setEditingId("");
      } else {
        newInfoClient.push(row);
        setListClient(newInfoClient);
        setEditingId("");
      }
      const formData = new FormData();
      formData.append("client", JSON.stringify(row));
      formData.append("clientId", JSON.stringify(clientId));

      axios
        .put("http://localhost:4000/api/admin/edit-client", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          messageApi.open({
            type: "success",
            content: response?.data.message,
          });
          setForce((prev) => prev + 1);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật thông tin:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedTags = tags?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType: col.dataIndex === "phone" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  // const handleDelete = (clientId) => {
  //   const newListClient = listClient?.filter(
  //     (item) => item?.clientId !== clientId
  //   );
  //   setListClient(newListClient);
  // };

  const handleAllow = (id) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("clientId", JSON.stringify(id));
    axios
      .put("http://localhost:4000/api/admin/unlock-client", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        messageApi.open({
          type: "success",
          content: response?.data.message,
        });
        setForce((prev) => prev + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLock = (id) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("clientId", JSON.stringify(id));

    axios
      .put("http://localhost:4000/api/admin/lock-client", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        messageApi.open({
          type: "success",
          content: response?.data.message,
        });
        setForce((prev) => prev + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/api/admin/get-client-account", {
        params: {
          // email: user.influencerEmail,
        },
      })
      .then((response) => {
        const info = response?.data?.data;
        setListClient(info);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching profile information:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [force]);

  // console.log(listClient);
  return (
    <>
      {contextHolder}
      <div className="admin-user-layout">
        {/* <div className="admin-user-title">
          <p>OVERVIEW</p>
        </div> */}
        <div className="admin-user-list-layout">
          <div className="admin-user-table">
            <Form form={form} component={false}>
              <Spin tip="Loading" size="large" spinning={isLoading}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  columns={mergedTags}
                  dataSource={listClient}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                    pageSize: 11,
                  }}
                  size="large"
                />
              </Spin>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminUserProfileLayout;
