import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderLoginHompape from "../../Components/Layouts/Header/HeaderLoginHompape";
import React, { useState, useEffect } from "react";
import {
  MailOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Menu, Modal, Input, Form, Button, List } from "antd";
import "./MyInfluencer.css";
import MyListPage from "./MyListPage";
import MyHistoryReport from "./MyHistoryReportPage";
import { map } from "highcharts";
import { v4 as uuid } from "uuid";
import ApiListInfluecer from "../../Api/ApiListInfluecer";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// data example get from BE
// const DATALIST = [
//   {
//     id: "mot",
//     label: "List 1",
//     dataMale: 50,
//     dataFemale: 50,
//     bar: [30, 30, 40, 50, 60],
//     influencer: 3,
//     channels: 4,
//     Esttotal: 5,
//     Price: 4,
//     Table: [
//       {
//         key: "1",
//         influencer: "John Brown",
//         followers: 32,
//         interactions: "New York No. 1 Lake Park",
//         costestimate: ["nice", "developer"],
//       },
//       {
//         key: "2",
//         influencer: "Jim Green",
//         followers: 42,
//         interactions: "London No. 1 Lake Park",
//         costestimate: ["loser"],
//       },
//       {
//         key: "3",
//         influencer: "Joe Black",
//         followers: 32,
//         interactions: "Sydney No. 1 Lake Park",
//         costestimate: ["cool", "teacher"],
//       },
//     ],
//   },
//   {
//     id: "hai",
//     label: "List 2",
//     dataMale: 40,
//     dataFemale: 60,
//     bar: [10, 20, 30, 40, 50, 30],
//     influencer: 6,
//     channels: 5,
//     Esttotal: 2,
//     Price: 1,
//     Table: [
//       {
//         key: "1",
//         influencer: "John Brown",
//         followers: 32,
//         interactions: "New York No. 1 Lake Park",
//         costestimate: ["nice", "developer"],
//       },
//       {
//         key: "2",
//         influencer: "Jim Green",
//         followers: 42,
//         interactions: "London No. 1 Lake Park",
//         costestimate: ["loser"],
//       },
//     ],
//   },
//   {
//     id: "ba",
//     label: "List 3",
//     dataMale: 30,
//     dataFemale: 70,
//     bar: [30, 40, 10, 30, 50, 70],
//     influencer: 1,
//     channels: 2,
//     Esttotal: 4,
//     Price: 5,
//     Table: [
//       {
//         key: "2",
//         influencer: "Jim Green",
//         followers: 42,
//         interactions: "London No. 1 Lake Park",
//         costestimate: ["loser"],
//       },
//     ],
//   },
// ];
// const DATA_NAMELIST = [];

// DATALIST.forEach((item) => {
//   DATA_NAMELIST.push(getItem(item.label, item.id));
// });
// DATA_NAMELIST.push(getItem("+ Add New", "new"));

const MyInfluencer = () => {
  const [addNewList, setAddNewList] = useState(false);
  const [checkTabListPage, setCheckTabListPage] = useState(true);
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

  function getDataSelectList() {
    var elementData = dataOfList.find((obj) => obj.id === listSelected);
    setObject(elementData);
  }

  var listMenu = [];

  listInfluencer.forEach((item) => {
    listMenu.push(getItem(item.Name_list, item.ClientLists_ID));
  });
  listMenu.push(getItem("+ Add New", "new"));
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
  ];

  //====================== Get Data Back End ======================
  const fetchDataGetList = async () => {
    try {
      const response = (await ApiListInfluecer.getListMenu()).data;
      setListInfluencer(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const AddNewListClient = async (idList, nameList) => {
    try {
      const response = await ApiListInfluecer.addListClient(idList, nameList);
      if (response.Status == "Success") {
        fetchDataGetList();
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const fetchDataTableKOLs = async (idList) => {
    try {
      const response = await ApiListInfluecer.getTableKOLs(idList);
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
      console.log(totalFlollowers);
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
      setObject(dataObject);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //================================================================
  //====================== click item in list=======================
  const onClick = (e) => {
    console.log("key", e);
    if (e.key === "history") {
      setCheckTabListPage(false);
    } else {
      setCheckTabListPage(true);
      setListSelected(e.key);
      fetchDataTableKOLs(e.key);
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
      console.log(`id: ${idList}, name ${nameList}`);
      AddNewListClient(idList, nameList);
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

  // useEffect(() => {
  //   fetchDataGetList();
  // }, []);

  //Remove Influ out list
  useEffect(() => {
    fetchDataTableKOLs(listSelected);
  }, [flagChangeDataTable]);

  //Change Name List
  useEffect(() => {
    fetchDataGetList();
    setCheckTabListPage(true);
    setListSelected(listSelected);
  }, [flagChangeNameList]);

  useEffect(() => {
    fetchDataTableKOLs(listSelected);
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
  return (
    <>
      <div className="coverMain">
        <HeaderLoginHompape />
        <div className="row pt-5">
          <div className="col-2 pt-2 menuList">
            <Menu
              onClick={onClick}
              className="menu"
              mode="inline"
              items={items}
              selectedKeys={[listSelected]}
            />
          </div>
          <div className="col-10">
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
                // IdList={IdList}
                // DeleteList={DeleteList}
              />
            ) : (
              <MyHistoryReport />
            )}
          </div>
        </div>

        <FooterHome />
      </div>
      <Modal
        title="Add New List"
        className="popup-add-new"
        centered
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
