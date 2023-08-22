import React from "react";
import "./AdminUpgradeLayout.css";
import {
  Table,
  Popconfirm,
  Form,
  Input,
  Typography,
  message,
  Spin,
  Tag,
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

const AdminUpgradeLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [editingId, setEditingId] = React.useState("");
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [force, setForce] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [listPackage, setListPackage] = React.useState([]);

  const isEditing = (record) => {
    return record?.clientId === editingId;
  };

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
      plan: "",
      date: "",
      pointReport: "",
      pointSearch: "",
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
      title: "Package",
      dataIndex: "plan",
      width: "8%",
      editable: true,
      render: (_) => {
        return (
          <Tag
            color={
              _ === "Gold"
                ? "gold"
                : _ === "Business"
                ? "magenta"
                : _ === "Starter"
                ? "purple"
                : "green"
            }
          >
            {_}
          </Tag>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Date upgrade",
      dataIndex: "dateTransaction",
      width: "12%",
      editable: true,
    },
    {
      title: "Report remaining",
      dataIndex: "pointReport",
      width: "13%",
      editable: true,
    },
    {
      title: "Search remaining",
      dataIndex: "pointSearch",
      width: "13%",
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
              // onClick={() => handleSave(record?.clientId)}
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
                // onClick={async () => {
                //   if (await check()) {
                //     console.log(true);
                //     setOpenConfirm(true);
                //   } else {
                //     setEditingId("");
                //   }
                // }}
              >
                Cancel
              </p>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingId !== ""}
            // onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedTags = tags?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType: col.dataIndex === "report" || "search" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

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
        setListPackage(info);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching profile information:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [force]);

  return (
    <>
      {contextHolder}
      <div className="admin-upgrade-layout">
        <div className="admin-upgrade-table">
          <Form form={form} component={false}>
            {/* <Spin tip="Loading" size="large" spinning={isLoading}> */}
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              columns={mergedTags}
              dataSource={listPackage}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
                pageSize: 11,
              }}
              size="large"
            />
            {/* </Spin> */}
          </Form>
        </div>
      </div>
    </>
  );
};
export default AdminUpgradeLayout;
