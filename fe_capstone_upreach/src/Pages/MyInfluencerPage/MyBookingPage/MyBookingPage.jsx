import React from "react";
import "./MyBookingPage.css";
import { useUserStore } from "../../../Stores/user";
import ClientHistoryBookingCard from "../../../Components/ClientHistoryBookingCard/ClientHistoryBookingCard";
import axios from "axios";

const MyBookingPage = () => {
  const [user] = useUserStore((state) => [state.user]);
  console.log(user);
  const [bookingHistory, setBookingHistory] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/api/client/get-history-booking", {
        params: {
          email: user.email,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        const bookingDataArray = response.data.data;
        const bookingHistoryList = bookingDataArray?.map((data) => ({
          bookingId: data?.booking?.clientBooking_ID,
          jobId: data?.booking?.Job_ID,
          startDate: data?.booking?.Start_Date,
          endDate: data?.booking?.End_Date,
          status: data?.booking?.Status,
          feedback: data?.booking?.Feedback,
          describes: data?.booking?.Describes,
          jobName: data?.job?.Name_Job,
          platform: data?.job?.Platform_Job,
          jobLink: data?.job?.Link,
          costEstimateFrom: data?.job?.CostEstimate_From_Job,
          costEstimateTo: data?.job?.CostEstimate_To_Job,
          quantity: data?.job?.Quantity,
          formatContent: data?.formatId,
          kolName: data?.kolName,
        }));
        setBookingHistory(bookingHistoryList);
      })
      .catch((error) => {
        console.error(
          "Error while fetching history booking information:",
          error
        );
      });
  }, []);
  return (
    <>
      <div className="my-booking-page-wrapper">
        <div className="influencer-booking-title">
          <p>HISTORY BOOKING</p>
        </div>
        <div className="influencer-booking-sub-title">
          <p style={{ width: "18.8%" }}>Influencer Name</p>
          <p style={{ width: "12.1%" }}>Platform</p>
          <p style={{ width: "14.5%" }}>Content</p>
          <p style={{ width: "12.9%" }}>Quantities</p>
          <p style={{ width: "12%" }}>Status</p>
          <p style={{ width: "15%" }}>Start Date</p>
          <p style={{ width: "15%" }}>End Date</p>
        </div>
        <div className="influencer-booking-list">
          {bookingHistory?.map((booking, index) => (
            <div className="mb-3" key={index}>
              <ClientHistoryBookingCard bookingList={booking} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBookingPage;
