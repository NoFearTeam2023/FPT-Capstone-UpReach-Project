import React, { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ApiMessage from "../../../Api/ApiMessage";

const ChatContent = ({ selectedUser, socket, currentUser, inforUser }) => {
  console.log("currentUser", currentUser);
  console.log("selectedUser", selectedUser);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  // Get all message
  const getAllDataMesager = async () => {
    try {
      const dataInfoOfChat = {
        _idUser: currentUser,
        _idChat: selectedUser?._id,
      };
      const response = await ApiMessage.getAllMessage(dataInfoOfChat);
      setMessages(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // setInterval(getAllDataMesager, 1000);
    getAllDataMesager();
  }, [selectedUser]);

  //Api add message
  const handleSendMessage = async (messageText) => {
    try {
      const dataMessage = {
        _idUser: currentUser,
        _idChat: selectedUser?._id,
        message: messageText,
      };
      const response = await ApiMessage.addMessage(dataMessage);

      if (response.status == true) {
        socket.current.emit("send-msg", {
          to: selectedUser._id,
          from: currentUser,
          data: { mess: messageText, info: inforUser },
        });
        const isSenderInfluencer = inforUser.roleId == 2 ? false : true;
        const senderInfo =
          inforUser.roleId == 2
            ? { username: inforUser.fullNameClient }
            : { nickname: inforUser.nickName };
        const msgs = [...messages];
        msgs.push({
          fromSelf: true,
          message: messageText,
          isSenderInfluencer: isSenderInfluencer,
          senderInfo: senderInfo,
        });
        setMessages(msgs);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      console.log("Socket connected:", socket.current.connected);
      socket.current.on("msg-recieve", (msg) => {
        console.log("msg", msg);
        console.log("inforUser", inforUser);
        const isSenderInfluencer = inforUser.roleId == 2 ? true : false;
        const senderInfo =
          msg.info.roleId == 2
            ? {
                username: msg.info.fullNameClient,
                avatarImage: msg.info?.avatar,
              }
            : { nickname: msg.info.nickName, avatarImage: msg.info?.avatar };
        setArrivalMessage({
          fromSelf: false,
          message: msg.mess,
          isSenderInfluencer: isSenderInfluencer,
          senderInfo: senderInfo,
        });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-content">
      <div className="chat-header">
        {selectedUser?.nickname
          ? selectedUser?.nickname
          : selectedUser?.username}
      </div>
      <div className="chat-body">
        <MessageList messages={messages} scrollRef={scrollRef} />
      </div>
      <div className="chat-input">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContent;
