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
  Select,
} from "antd";
import default_img from "../../../../Assets/Image/Default/DefaultImg.jpg";

import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminUpgradeLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [editingId, setEditingId] = React.useState("");
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [force, setForce] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [listPackage, setListPackage] = React.useState([]);

  const check = async () => {
    // console.log(form);
    try {
      const row = await form.getFieldsValue();
      // console.log(row);
      if (editingId !== "") {
        if (
          listPackage?.some(
            (item) => item?.clientId == editingId && item?.plan == row?.plan
          ) &&
          // listPackage?.some((item) => {
          //   return (
          //     item?.clientId == editingId &&
          //     item?.dateTransaction == row?.dateTransaction
          //   );
          // }) &&
          // listPackage?.some(
          //   (item) =>
          //     item?.clientId == editingId && item?.duration == row?.duration
          // ) &&
          listPackage?.some(
            (item) =>
              item?.clientId == editingId &&
              item?.pointReport == row?.pointReport
          ) &&
          listPackage?.some(
            (item) =>
              item?.clientId == editingId &&
              item?.pointSearch == row?.pointSearch
          )
        ) {
          return false;
        } else return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      inputType === "select" ? (
        <Select placeholder="Please select a platform">
          <Option value="Free">Free</Option>
          <Option value="Starter">Starter</Option>
          <Option value="Business">Business</Option>
          <Option value="Gold">Gold</Option>
        </Select>
      ) : inputType === "number" ? (
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
      plan: "",
      // dateTransaction: "",
      // duration: "",
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

  const formatDate = (dateString) => {
    const jsDate = new Date(dateString);
    const day = jsDate.getDate();
    const month = jsDate.getMonth() + 1;
    const year = jsDate.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
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
      width: "18%",
    },
    {
      title: "Brand Name",
      dataIndex: "brand",
      width: "14%",
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
      title: "Date upgrade",
      dataIndex: "dateTransaction",
      width: "10%",
      render: (dateString) => (dateString ? formatDate(dateString) : ""),
      // editable: true,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      width: "10%",
      render: (dateString) => (dateString ? formatDate(dateString) : ""),
      // editable: true,
    },
    {
      title: "Report remaining",
      dataIndex: "pointReport",
      width: "12%",
      editable: true,
    },
    {
      title: "Search remaining",
      dataIndex: "pointSearch",
      width: "12%",
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
                    console.log(true);
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
  ];

  const handleSave = async (clientId) => {
    setIsLoading(true);
    try {
      const row = await form.validateFields();
      const newInfoClient = [...listPackage];
      const index = newInfoClient?.findIndex(
        (item) => clientId === item?.clientId
      );
      if (index > -1) {
        const item = newInfoClient[index];
        newInfoClient?.splice(index, 1, {
          ...item,
          ...row,
        });
        setListPackage(newInfoClient);
        setEditingId("");
      } else {
        newInfoClient.push(row);
        setListPackage(newInfoClient);
        setEditingId("");
      }
      const formData = new FormData();
      formData.append("package", JSON.stringify(row));
      formData.append("clientId", JSON.stringify(clientId));

      axios
        .put("http://localhost:4000/api/admin/edit-package", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          messageApi.open({
            type: "success",
            content: response?.data?.message,
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
          inputType:
            col.dataIndex === "plan"
              ? "select"
              : col.dataIndex === "pointReport" ||
                col.dataIndex === "pointSearch"
              ? "number"
              : "text",
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
          <Spin tip="Loading" size="large" spinning={isLoading}>
            <Form form={form} component={false}>
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
                  pageSize: 10,
                }}
                size="large"
              />
            </Form>
          </Spin>
        </div>
      </div>
    </>
  );
};
export default AdminUpgradeLayout;
