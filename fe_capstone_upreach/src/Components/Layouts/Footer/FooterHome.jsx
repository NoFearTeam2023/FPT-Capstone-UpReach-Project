import React from "react";
import { Space, Typography } from "antd";
import { ReactComponent as Logo } from "../../../Assets/Image/LogoLogo.svg";
import "./FooterHome.css";
import {
  FooterCompany,
  FooterContact,
  FooterMore,
} from "../../Constant/ConstFooter";

function FooterHome() {
  //   function ListOfFooter({ dtaFooter, nameFooter }) {
  //     return (
  //       <Space direction="vertical">
  //         <Typography.Text
  //           style={{
  //             color: "#FFFFFF",
  //             fontFamily: "Poppins",
  //             fontWeight: "bold",
  //             fontSize: "16px",
  //           }}
  //         >
  //           {nameFooter}
  //         </Typography.Text>
  //         {dtaFooter.map((value, index) => (
  //           <Typography.Text
  //             key={index}
  //             style={{
  //               color: "#FFFFFF",
  //               fontFamily: "Poppins",
  //               fontSize: "10px",
  //             }}
  //             onClick={() => alert("aaa")}
  //           >
  //             {value}
  //           </Typography.Text>
  //         ))}
  //       </Space>
  //     );
  //   }

  return (
    <div className="FooterHomePage">
      <div className="row ps-5">
        <div className="col-6 pt-5">
          <Logo />
          <div className="textDescriptionFooter text-lineHeight-30 text-white-size-12">
            Book your Influencer in minute, get full <br /> Control for much
            longer.
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="text-lineHeight-30 col-4">
              <div className="textTitleFooter">Company</div>
              <div className="text-white-size-12 my-1">About</div>
              <div className="text-white-size-12 my-1">Careers</div>
              <div className="text-white-size-12 my-1">Logistic</div>
              <div className="text-white-size-12 my-1">Privacy & Policy</div>
            </div>
            <div className="text-lineHeight-30 col-4">
              <div className="textTitleFooter ">Contact</div>
              <div className="text-white-size-12 my-1">Help/FAQ</div>
              <div className="text-white-size-12 my-1">Press</div>
              <div className="text-white-size-12 my-1">Affiliates</div>
            </div>
            <div className="text-lineHeight-30 col-4">
              <div className="textTitleFooter">More</div>
              <div className="text-white-size-12 my-1">Press Centre</div>
              <div className="text-white-size-12 my-1">Our Blog</div>
              <div className="text-white-size-12 my-1">Low fare tips</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 mt-4">
        <div className="row">
          <div className="col-1 bg-black"></div>
          <div className="border-top-white"></div>
          <div className="col-1 bg-black"></div>
        </div>
        <div className="col-12 mt-4">
          <div className="row">
            <div className="col-10 ms-5 text-white  -size-12 ">
              Copyright, Upsearch 2023. All rights reserved.
            </div>
            <div className="col text-white-size-12">Terms & Conditions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterHome;
{
  /* <Space>
        <Space direction="vertical">
          <Logo />
          <Typography.Text
            style={{
              color: "#FFFFFF",
              fontFamily: "Poppins",
              fontSize: "text-white-size-text-white-size-12px",
            }}
          >
            Book your Influencer in minute, get full <br /> Control for much
            longer.
          </Typography.Text>
        </Space>
        <ListOfFooter dtaFooter={FooterCompany} nameFooter="Company" />
        <ListOfFooter dtaFooter={FooterContact} nameFooter="Contact" />
        <ListOfFooter dtaFooter={FooterMore} nameFooter="More" />
      </Space> */
}
