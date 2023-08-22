import React from "react";
import "./InfluencerBookingLayout.css";
import InfluencerBookingCard from "../../../../Components/InfluencerBookingCard/InfluencerBookingCard";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal } from "antd";
import axios from "axios";
import { useUserStore } from "../../../../Stores/user";

const InfluencerBookingLayout = () => {
  const [user] = useUserStore((state) => [state.user]);
  const [sortOption, setSortOption] = React.useState("Choose Option");
  const items = [
    {
      label: (
        <p
          onClick={(e) => {
            setSortOption(e.target.innerText);
          }}
        >
          Name
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p
          onClick={(e) => {
            setSortOption(e.target.innerText);
          }}
        >
          Date
        </p>
      ),
      key: "1",
    },
    {
      label: (
        <p
          onClick={(e) => {
            setSortOption(e.target.innerText);
          }}
        >
          Cost
        </p>
      ),
      key: "2",
    },
  ];
  const [bookingList, setBookingList] = React.useState([]);

  const hanldeSort = (bookingList) => {
    let sortedList = [...bookingList];
    if (sortOption === "Name") {
      return sortedList.sort((a, b) => {
        const nameA = a?.clientName.toUpperCase();
        const nameB = b?.clientName.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else if (sortOption === "Date") {
      return sortedList.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA - dateB;
      });
    }
    // else if (sortOption === "Cost") {
    //   return bookingList.sort((a, b) => {
    //     return a.cost - b.cost;
    //   });
    // }
    else return bookingList;
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/api/influ/get-booking-jobs", {
        params: {
          email: user.email,
        },
      })
      .then((response) => {
        const bookingDataArray = response.data.data;
        console.log(response.data.data);
        const bookingJobList = bookingDataArray?.map((data) => ({
          bookingId: data?.clientBooking_ID,
          jobId: data?.Job_ID,
          brandName: data?.clientInfo?.Brand_Client,
          clientName: data?.clientInfo?.FullName,
          jobName: data?.Name_Job,
          platform: data?.Platform_Job,
          jobLink: data?.Link,
          quantity: data?.Quantity,
          costEstimateFrom: data?.CostEstimate_From_Job,
          costEstimateTo: data?.CostEstimate_To_Job,
          formatContent: data?.Format_Id,
          describes: data?.Describes,
          startDate: data?.Start_Date,
          endDate: data?.End_Date,
          status: data?.Status,
        }));
        setBookingList(bookingJobList);
      })
      .catch((error) => {
        console.error(
          "Error while fetching previewBooking information:",
          error
        );
      });
  }, []);

  return (
    <>
      <div className="influencer-booking-layout">
        <div className="influencer-booking-title">
          <p>LIST BOOKING</p>
          <div className="booking-filter">
            <p>Sort by:</p>
            <div className="booking-sort-by">
              <Dropdown menu={{ items }} trigger={"click"}>
                <a>
                  <Space>{sortOption}</Space>
                </a>
              </Dropdown>
              <DownOutlined />
            </div>
          </div>
        </div>
        <div className="influencer-booking-sub-title">
          <p style={{ width: "18.8%" }}>Brand Name</p>
          <p style={{ width: "12.1%" }}>Platform</p>
          <p style={{ width: "14.5%" }}>Content</p>
          <p style={{ width: "12.9%" }}>Quantities</p>
          <p style={{ width: "12%" }}>Status</p>
          <p style={{ width: "15%" }}>Start Date</p>
          <p style={{ width: "15%" }}>End Date</p>
        </div>
        <div className="influencer-booking-list">
          {hanldeSort(bookingList)?.map((booking, index) => (
            <div className="mb-3" key={index}>
              <InfluencerBookingCard bookingList={booking} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfluencerBookingLayout;
