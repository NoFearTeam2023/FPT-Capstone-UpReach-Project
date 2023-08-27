import React from "react";
import "./InfluencerBookingLayout.css";
import InfluencerBookingCard from "../../../../Components/InfluencerBookingCard/InfluencerBookingCard";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Spin, Skeleton } from "antd";
import axios from "axios";
import { useUserStore } from "../../../../Stores/user";

const InfluencerBookingLayout = () => {
  const [user] = useUserStore((state) => [state.user]);
  const [sortOption, setSortOption] = React.useState("Choose Option");
  const [bookingList, setBookingList] = React.useState([]);
  console.log();
  const [isLoading, setIsLoading] = React.useState(false);
  const items = [
    {
      label: (
        <p
          onClick={(e) => {
            setSortOption(e.target.innerText);
          }}
        >
          Status
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
          Start Date
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
          Quantity
        </p>
      ),
      key: "2",
    },
  ];

  const hanldeSort = (bookingList) => {
    let sortedList = [...bookingList];
    if (sortOption === "Status") {
      return sortedList?.sort((a, b) => {
        const statusOrder = {
          Pending: 1,
          Processing: 2,
          Done: 3,
          Rejected: 4,
        };

        const orderA = statusOrder[a?.status];
        const orderB = statusOrder[b?.status];

        return orderA - orderB;
      });
    } else if (sortOption === "Start Date") {
      return sortedList?.sort((a, b) => {
        const dateA = new Date(a?.startDate.split("/").reverse().join("/"));
        const dateB = new Date(b?.startDate.split("/").reverse().join("/"));
        return dateA - dateB;
      });
    } else if (sortOption === "Quantity") {
      return bookingList?.sort((a, b) => {
        return b?.quantity - a?.quantity;
      });
    } else return bookingList;
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://139.180.155.253/api/influ/get-booking-jobs", {
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
      })
      .finally(() => {
        setIsLoading(false);
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
          <Skeleton size="large" loading={isLoading} active>
            {hanldeSort(bookingList)?.map((booking, index) => (
              <div className="mb-3" key={index}>
                <InfluencerBookingCard bookingList={booking} />
              </div>
            ))}
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default InfluencerBookingLayout;
