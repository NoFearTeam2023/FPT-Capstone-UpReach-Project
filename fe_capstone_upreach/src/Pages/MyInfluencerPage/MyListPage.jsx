import FooterHome from "../../Components/Layouts/Footer/FooterHome";
import HeaderHomepage from "../../Components/Layouts/Header/HeaderHomepage";
import React, { useEffect, useState } from "react";
import { ReactComponent as Influencers } from "../../Assets/Icon/InfluencersMyList.svg";
import { ReactComponent as TotalInteractions } from "../../Assets/Icon/Est.TotalInteractions.svg";
import { ReactComponent as Channels } from "../../Assets/Icon/ChannelsMyList.svg";
import { ReactComponent as PricePerAssignment } from "../../Assets/Icon/PricePerAssignment.svg";
import {
  MailOutlined,
  SettingOutlined,
  EditOutlined,
  RestOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Modal,
  Input,
  Form,
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
} from "antd";
import "./MyInfluencer.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Index_HomePage from "../HomePage/Index_HomePage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ApiListInfluecer from "../../Api/ApiListInfluecer";

const MyListPage = ({
  object,
  listInfluencer,
  tableInfluencer,
  editnamelist,
  setEditNameList,
  setListSelected,
  fetchDataTableKOLs,
  flagChangeDataTable,
  setFlagChangeDataTable,
  flagChangeNameList,
  setFlagChangeNameList,
  flagDeleteList,
  setFlagDeleteList,
  idAccClient,
}) => {
  const [dataListShow, setDataListShow] = useState({});
  const [isFirstShow, setIsFirstShow] = useState(true);
  const [dataIDList, setDataIDList] = useState();
  const [editList, setEditList] = useState(false);
  const [delList, setDelList] = useState(false);
  const [delInflu, setDelInflu] = useState(false);
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [isNameListExist, setIsNameListExist] = useState(false);
  const [form] = Form.useForm();
  const [dataPieChart, setDataPieChart] = useState();
  const [dataBarChart, setDataBarChart] = useState();
  // const [namelist, setNameList] = useState();

  // var numberElement = findUserById(IDList);

  // console.log("element: " + dataList[0].channels);

  // Data apply ==================================

  // const dataPieChart = {
  //   chart: {
  //     type: "pie",
  //     height: 250,
  //   },
  //   title: {
  //     text: "",
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   plotOptions: {
  //     pie: {
  //       innerSize: 100,
  //       depth: 45,
  //     },
  //   },

  //   series: [
  //     {
  //       name: "Ratio ",
  //       data: [
  //         {
  //           name: "Male",
  //           // y: object?.Table.length === 0 ? [] : object?.dataMale,
  //           y: null,
  //         },
  //         {
  //           name: "Female",
  //           // y: object?.Table.length === 0 ? [] : object?.dataFemale,
  //           y: null,
  //         },
  //       ],
  //     },
  //   ],
  // };
  // const dataBarChart = {
  //   chart: {
  //     type: "bar",
  //     height: 250,
  //   },
  //   title: {
  //     text: "",
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   legend: {
  //     align: "right",
  //     verticalAlign: "top",
  //     layout: "vertical",
  //   },
  //   xAxis: {
  //     categories: [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //   },
  //   yAxis: {
  //     gridLineWidth: 0,
  //   },
  //   plotOptions: {
  //     series: {
  //       pointWidth: 10,
  //     },
  //   },

  //   series: [
  //     {
  //       name: "Age",
  //       // data: object?.Table.length === 0 ? [] : object?.bar,
  //       data: [],
  //     },
  //   ],
  // };
  const columns = [
    {
      title: "All",
      // title: "All influencer (" + object?.Table.length + ")",
      dataIndex: "influencer",
      key: "influencer",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
      render: (text) => (
        <Tag color="blue">{(parseInt(text) / 1000).toFixed(1) + "K"}</Tag>
      ),
    },
    {
      title: "Interactions",
      dataIndex: "interactions",
      key: "interactions",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Cost estimate",
      key: "costestimate",
      dataIndex: "costestimate",
    },
    {
      title: "", //Action
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {object.Table.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <RestOutlined className="fs-2 text-danger" />
            </Popconfirm>
          ) : null}
        </Space>
      ),
    },
  ];

  const handleSubmit = (value) => {
    // setEditNameList({ key: object.id, name: nameEdit });
    if (editnamelist === "") {
      setIsEmptyInput(true);
      return;
    } else if (validateAddList(editnamelist)) {
      setIsNameListExist(true);
      return;
    } else {
      fetchEditNameList(idAccClient, object.id, editnamelist);
      setEditList(false);
    }
  };

  //============================= Delete DB BE =============================
  const fetchDeleteTable = async (idProfile, idList) => {
    try {
      const response = await ApiListInfluecer.deleteTableKOLs(
        idProfile,
        idList
      );
      if (response.Status == "Success") {
        // use Use effect in parent component
        setFlagChangeDataTable(!flagChangeDataTable);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //============================= Edit Name List DB BE =============================

  const fetchEditNameList = async (idAccClient, idList, nameList) => {
    try {
      const response = await ApiListInfluecer.editListName(
        idAccClient,
        idList,
        nameList
      );
      if (response.Status == "Success") {
        setFlagChangeNameList(!flagChangeNameList);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //============================= Delete List DB BE =============================
  const fetchAllTable = async (idList) => {
    try {
      const response = await ApiListInfluecer.deleteAllTable(idList);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchDeleteList = async (idList) => {
    try {
      const response = await ApiListInfluecer.deleteListClient(idList);
      if (response.Status == "Success") {
        setFlagDeleteList(!flagDeleteList);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  //===============================================================================
  //============================= Get Data Chart Audiance=============================
  const fetchDataAge = async () => {
    try {
      const ListKOLsIndenifier = [];
      object?.Table.forEach((element) => {
        ListKOLsIndenifier.push(element.key);
      });
      const response = await ApiListInfluecer.getAudienceDataAge(
        ListKOLsIndenifier
      );
      setDataPieChart({
        chart: {
          type: "pie",
          height: 250,
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45,
          },
        },

        series: [
          {
            name: "Ratio",
            data: [
              {
                name: "Male",
                y:
                  object?.Table.length === 0
                    ? []
                    : parseFloat(
                        (
                          (response.data[0]?.Quantity * 100) /
                          (response.data[0]?.Quantity +
                            response.data[1]?.Quantity)
                        ).toFixed(2)
                      ),
                // y: null,
              },
              {
                name: "Female",
                y:
                  object?.Table.length === 0
                    ? []
                    : parseFloat(
                        (
                          (response.data[1]?.Quantity * 100) /
                          (response.data[0]?.Quantity +
                            response.data[1]?.Quantity)
                        ).toFixed(2)
                      ),
                // y: null,
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchDataGender = async () => {
    try {
      const ListKOLsIndenifier = [];
      object?.Table.forEach((element) => {
        ListKOLsIndenifier.push(element.key);
      });
      const response = await ApiListInfluecer.getAudienceDataGender(
        ListKOLsIndenifier
      );
      const ListDataBarChart = [];
      response.data.forEach((item) => {
        ListDataBarChart.push(item.Quantity);
      });
      setDataBarChart({
        chart: {
          type: "bar",
          height: 250,
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        legend: {
          align: "right",
          verticalAlign: "top",
          layout: "vertical",
        },
        xAxis: {
          categories:
            object?.Table.length === 0
              ? []
              : [
                  response.data[0].AudienceAge,
                  response.data[1].AudienceAge,
                  response.data[2].AudienceAge,
                  response.data[3].AudienceAge,
                ],
        },
        yAxis: {
          gridLineWidth: 0,
        },
        plotOptions: {
          series: {
            pointWidth: 10,
          },
        },

        series: [
          {
            name: "Age",
            data: object?.Table.length === 0 ? [] : ListDataBarChart,
            // data: [],
          },
        ],
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  //===============================================================================
  // delete Influencer
  const handleDelete = (key) => {
    console.log(key + "," + object.id);
    fetchDeleteTable(key, object.id);
  };

  function validateAddList(nameList) {
    const isCheck = listInfluencer.some((item) => {
      if (item.Name_list === nameList) {
        if (item.Name_list === defaultValue) {
          return false;
        }
        return true;
      }
      return false;
    });
    console.log("isCheck", isCheck);
    return isCheck;
  }

  const cancelConfirmDel = () => {
    setDelList(false);
    setDelInflu(false);
  };

  function handleEdit() {
    setEditValue(object.label);
    setEditList(true);
    setEditNameList(object.label);
    setDefaultValue(object.label);
  }
  // handle delete
  function DeleteList() {
    fetchAllTable(object.id);
    fetchDeleteList(object.id);
    setDelList(false);
  }

  useEffect(() => {
    form.setFieldsValue(editValue);
    if (object === undefined) {
      setIsFirstShow(true);
    } else {
      setIsFirstShow(false);
    }
  }, [object, form, editValue]);

  useEffect(() => {
    fetchDataAge();
    fetchDataGender();
  }, [object]);

  const handleChangeValue = (event) => {
    setEditNameList(event.target.value);
    setIsEmptyInput(false);
    setIsNameListExist(false);
  };

  const navigateHomeMain = () => {
    return <Route path="/" exact component={Index_HomePage} />;
  };
  return (
    <>
      {isFirstShow ? (
        <></>
      ) : (
        <>
          <div className="row mt-5">
            <div className="col-12 mt-5 ms-5">
              <div className="row">
                <div className="col-10">
                  {object?.label} ( {object?.Table.length} profile )
                  <button className="button-edit" onClick={handleEdit}>
                    <EditOutlined className="fs-2" /> Edit
                  </button>
                </div>
                <div className="col-1 bg-white">
                  <button
                    className="button-delete"
                    onClick={() => {
                      setDelList(true);
                    }}
                  >
                    <RestOutlined className="fs-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
            {/* card 1 */}
            <div className="col-7 demographic mt-3 ms-4">
              <div className="title mt-3 ms-3">
                Audience Demographic
                <div className="row">
                  <div className="col-5">
                    <HighchartsReact
                      // ref={pieChart}
                      highcharts={Highcharts}
                      options={dataPieChart}
                    />
                  </div>
                  <div className="col-7">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={dataBarChart}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* card 2 */}
            <div className="col-4 demographic mt-3 ms-4">
              <div className="row info">
                <div className="col-6 text-center infomation">INFOMATION</div>
                <div className="col-6 text-center type">TYPE</div>
                <div className="col-12 mt-5">
                  <div className="row">
                    <div className="col-9">
                      <Influencers /> Influencers
                    </div>
                    <div className="col-3 value-type">{object?.influencer}</div>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="row">
                    <div className="col-9">
                      <Channels /> Channels
                    </div>
                    <div className="col-3 value-type">{object?.channels}</div>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="row">
                    <div className="col-9">
                      <TotalInteractions /> Total Follower
                    </div>
                    <div className="col-3 value-type">
                      {(parseInt(object?.Followers) / 1000).toFixed(1) + "K"}
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="row">
                    <div className="col-9">
                      <PricePerAssignment /> Total Interactions
                    </div>
                    <div className="col-3 value-type">
                      {(parseInt(object?.Interactions) / 1000).toFixed(1) + "K"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 group-by mt-5 ms-4">Group By</div>
          <div className="row">
            <div className="col-12 table-my-list mt-4 ms-4 mb-5">
              <Table columns={columns} dataSource={object?.Table} />
            </div>
            <div className="col-5"></div>
            <div className="col-2 bg-white pb-2">
              {" "}
              <Link to="/homepage">
                <Button onClick={navigateHomeMain}>+ New Influencer</Button>
              </Link>
            </div>
            <div className="col-5"></div>
          </div>
          <Modal
            title="Edit Name List"
            className="popup-add-new"
            centered
            open={editList}
            onOk={() => {
              form.submit(value);
            }}
            destroyOnClose={true}
            onCancel={() => {
              form.resetFields();
              setIsEmptyInput(false);
              setIsNameListExist(false);
              setEditList(false);
            }}
          >
            <div className="row">
              <div className="col-1 bg-white"></div>
              <div className="col-10">
                <Form form={form} onFinish={handleSubmit} className="mt-2">
                  <Form.Item>
                    <Input
                      style={{ border: "1px solid #9B9A9A" }}
                      defaultValue={editValue}
                      onChange={handleChangeValue}
                      required={true}
                    />
                  </Form.Item>
                  <div
                    className={isEmptyInput ? "d-block text-danger" : "d-none"}
                  >
                    Please enter name list
                  </div>
                  <div
                    className={
                      isNameListExist ? "d-block text-danger" : "d-none"
                    }
                  >
                    Name list is exits
                  </div>
                </Form>
              </div>
              <div className="col-1 bg-white"></div>
            </div>
          </Modal>
          <Modal
            title="Confirm Delete"
            className="popup-add-new"
            open={delList}
            onOk={DeleteList}
            onCancel={cancelConfirmDel}
            destroyOnClose={true}
            okText="Delete"
            cancelText="Cancel"
          >
            <div className="row">
              <div className="col-1 bg-white"></div>
              <div className="col-10">
                {" "}
                Do you want delete list "{object?.label}" ?
              </div>
              <div className="col-1 bg-white"></div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};
export default MyListPage;
