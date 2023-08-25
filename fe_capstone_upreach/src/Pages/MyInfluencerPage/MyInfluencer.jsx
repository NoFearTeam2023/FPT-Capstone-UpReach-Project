import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import React, { useState, useEffect } from "react";
import {
  MailOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  HistoryOutlined,
  FileProtectOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Menu, Modal, Input, Form, Button, List } from "antd";
import "./MyInfluencer.css";
import MyListPage from "./MyListPage";
import MyHistoryReport from "./MyHistoryReportPage";
import { map } from "highcharts";
import { v4 as uuid } from "uuid";
import ApiListInfluecer from "../../Api/ApiListInfluecer";
import { useUserStore } from "../../Stores/user";
import { useNavigate } from "react-router-dom";
import MyBookingPage from "./MyBookingPage/MyBookingPage";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const MyInfluencer = () => {
  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();
  const [addNewList, setAddNewList] = useState(false);
  const [checkTabListPage, setCheckTabListPage] = useState(true);
  const [tabName, setTabName] = useState("new");

  const [object, setObject] = useState();
  const [dataOfList, setdataOfList] = useState([]);
  const [value, setValue] = useState("");
  const [IdList, setIdList] = useState("");
  const [listSelected, setListSelected] = useState("");
  const [form] = Form.useForm();
  const [listInfluencer, setListInfluencer] = useState([]);
  const [editnamelist, setEditNameList] = useState();
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [isNameListExist, setIsNameListExist] = useState(false);
  const [tableInfluencer, setTableInfluencer] = useState([]);
  const [flagChangeDataTable, setFlagChangeDataTable] = useState(true);
  const [flagChangeNameList, setFlagChangeNameList] = useState(true);
  const [flagDeleteList, setFlagDeleteList] = useState(true);
  const [idAccClient, setIdAccClient] = useState("");

  // // get Id account
  // function getClientID() {

  // }

  //get all list in menu
  function getDataSelectList() {
    var elementData = dataOfList.find((obj) => obj.id === listSelected);
    setObject(elementData);
  }

  var listMenu = [];

  listInfluencer.forEach((item) => {
    listMenu.push(getItem(item.Name_list, item.ClientLists_ID));
  });
  listMenu.push(getItem("Add New", "new", <FolderAddOutlined />));
  const items = [
    {
      type: "divider",
    },
    getItem(
      "List (" + listInfluencer?.length + ")",
      "list",
      <UnorderedListOutlined />,
      listMenu // listInfluencer
    ),
    getItem(
      "",
      "grp",
      null,
      [getItem("My History Report", "history", <HistoryOutlined />)],
      "group"
    ),
    getItem(
      "",
      "bkg",
      null,
      [getItem("History Booking", "booking", <FileProtectOutlined />)],
      "group"
    ),
  ];

  //====================== Get Data Back End ======================
  const fetchDataGetList = async () => {
    try {
      const dataLocalStorge = await JSON.parse(
        localStorage.getItem("user-draw-storage")
      ).state.user.Client_ID;
      setIdAccClient(dataLocalStorge);
      const response = (await ApiListInfluecer.getListMenu(dataLocalStorge))
        .data;
      setListInfluencer(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const AddNewListClient = async (clientID, idList, nameList) => {
    try {
      const response = await ApiListInfluecer.addListClient(
        clientID,
        idList,
        nameList
      );
      if (response.Status == "Success") {
        fetchDataGetList();
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const fetchDataTableKOLs = async (idAccClient, idList) => {
    try {
      const response = await ApiListInfluecer.getTableKOLs(idAccClient, idList);
      setTableInfluencer(response);
      const nameIdList = listInfluencer.find(
        (item) => item.ClientLists_ID == idList
      );
      const totalFlollowers = response.Table.reduce(function (prev, current) {
        return prev + +current.followers;
      }, 0);
      const totalInteractions = response.Table.reduce(function (prev, current) {
        return prev + +current.interactions;
      }, 0);
      const dataObject = {
        id: idList,
        label: nameIdList.Name_list,
        dataMale: 30,
        dataFemale: 70,
        bar: [30, 40, 10, 30, 50, 70],
        influencer: response.Table.length,
        channels: response.Table.length ? 4 : 0,
        Followers: totalFlollowers,
        Interactions: totalInteractions,
        Table: response.Table,
      };
      console.log("aa");
      setObject(dataObject);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //================================================================
  //====================== click item in list=======================
  const onClick = (e) => {
    if (e.key === "history") {
      setCheckTabListPage(false);
      setTabName(e.key);
    } else if (e.key === "booking") {
      setCheckTabListPage(false);
      setTabName(e.key);
    } else {
      setCheckTabListPage(true);
      setListSelected(e.key);
      fetchDataTableKOLs(idAccClient, e.key);
      // setIdList(e.key);
    }
    if (e.key === "new") {
      setAddNewList(true);
      form.resetFields();
      setIsEmptyInput(false);
      setIsNameListExist(false);
    }
  };

  const handleSubmit = (value) => {
    const nameList = editnamelist;
    setValue(nameList);
    if (nameList === "" || nameList === undefined) {
      setIsEmptyInput(true);
      return;
    } else if (validateAddList(nameList)) {
      setIsNameListExist(true);
      return;
    } else {
      //setListInfluencer([getItem(nameList, nameList), ...listInfluencer]);
      const idList = uuid().slice(0, 8);
      AddNewListClient(idAccClient, idList, nameList);
      setAddNewList(false);
      form.resetFields();
      setListSelected(idList);
      setEditNameList("");
    }
  };

  function validateAddList(nameList) {
    const isCheck = listInfluencer.some((item) => {
      if (item.Name_list === nameList) {
        return true;
      }
      return false;
    });
    return isCheck;
  }
  // Use Effect
  // useEffect(() => {
  //   getDataSelectList();
  // }, [dataOfList, listSelected, listInfluencer]);

  useEffect(() => {
    fetchDataGetList(idAccClient);
  }, []);

  //Remove Influ out list
  useEffect(() => {
    fetchDataTableKOLs(idAccClient, listSelected);
  }, [flagChangeDataTable]);

  //Change Name List
  useEffect(() => {
    fetchDataGetList();
    setCheckTabListPage(true);
    setListSelected(listSelected);
  }, [flagChangeNameList]);

  useEffect(() => {
    fetchDataTableKOLs(idAccClient, listSelected);
  }, [listInfluencer]);

  //Delete List
  useEffect(() => {
    fetchDataGetList();
    setObject();
  }, [flagDeleteList]);

  const handleChangeValue = (event) => {
    setEditNameList(event.target.value);
    setIsEmptyInput(false);
    setIsNameListExist(false);
  };

  React.useEffect(() => {
    if (user.roleId == 1) {
      navigate("/admin/dashboard");
    } else if (user.roleId == 2) {
      navigate("/myinfluencer");
    } else if (user.roleId == 3) {
      navigate("/influencer/my-report");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {console.log(tabName)}
      {user?.roleId == 2 ? (
        <div className="coverMain">
          <HeaderHomepage />
          <div className="row pt-5">
            <div className="col-2 pt-2 menuList padding-0">
              <Menu
                onClick={onClick}
                className="menu"
                mode="inline"
                items={items}
                selectedKeys={[listSelected]}
              />
            </div>
            <div className="col-10 padding-0">
              {checkTabListPage ? (
                <MyListPage
                  listInfluencer={listInfluencer}
                  setdataOfList={setdataOfList}
                  object={object}
                  tableInfluencer={tableInfluencer}
                  editnamelist={editnamelist}
                  setEditNameList={setEditNameList}
                  setListSelected={setListSelected}
                  getDataSelectList={getDataSelectList}
                  flagChangeDataTable={flagChangeDataTable}
                  setFlagChangeDataTable={setFlagChangeDataTable}
                  flagChangeNameList={flagChangeNameList}
                  setFlagChangeNameList={setFlagChangeNameList}
                  flagDeleteList={flagDeleteList}
                  setFlagDeleteList={setFlagDeleteList}
                  idAccClient={idAccClient}
                  // IdList={IdList}
                  // DeleteList={DeleteList}
                />
              ) : (
                <>
                  {tabName === "history" ? (
                    <div className="content-history-bg">
                      <MyHistoryReport />
                    </div>
                  ) : tabName === "booking" ? (
                    <MyBookingPage />
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>

          <FooterHome />
        </div>
      ) : (
        ""
      )}
      <Modal
        title="Add New List"
        className="popup-add-new"
        centered
        destroyOnClose={true}
        open={addNewList}
        onOk={() => form.submit(value)}
        onCancel={() => setAddNewList(false)}
      >
        <div className="row">
          <div className="col-1 bg-white"></div>
          <div className="col-10">
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item>
                <Input
                  style={{ border: "1px solid #9B9A9A" }}
                  onChange={handleChangeValue}
                />
              </Form.Item>
              <div className={isEmptyInput ? "d-block text-danger" : "d-none"}>
                Please enter name list
              </div>
              <div
                className={isNameListExist ? "d-block text-danger" : "d-none"}
              >
                Name list is exits
              </div>
            </Form>
          </div>
          <div className="col-1 bg-white"></div>
        </div>
      </Modal>
    </>
  );
};
export default MyInfluencer;
