import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Chat() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!message) return;

    await addDoc(collection(db, "messages"), {

      text: message,

      sender: "Team Member",

      createdAt: new Date()

    });

    await addDoc(collection(db, "notifications"), {

      message: `New chat message: ${message}`,

      createdAt: new Date()

    });

    setMessage("");
  };

  // REALTIME LISTENER
  useEffect(() => {

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const messageList = [];

      snapshot.forEach((doc) => {

        messageList.push({
          id: doc.id,
          ...doc.data()
        });

      });

      setMessages(messageList);

    });

    return () => unsubscribe();

  }, []);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          Team Chat
        </h1>

        <div className="bg-white rounded-xl shadow p-6 h-[80vh] flex flex-col">

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto mb-6">

            {
              messages.map((msg) => (

                <div
                  key={msg.id}
                  className="mb-4 flex"
                >

                  <div className="bg-blue-600 text-white p-4 rounded-2xl max-w-md">

                    <p className="font-bold mb-1">
                      {msg.sender}
                    </p>

                    <p>
                      {msg.text}
                    </p>

                  </div>

                </div>

              ))
            }

          </div>

          {/* INPUT */}
          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Type message..."
              className="flex-1 border p-4 rounded-xl"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 rounded-xl"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Chat;