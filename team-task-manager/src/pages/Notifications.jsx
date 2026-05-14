import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {

    const querySnapshot = await getDocs(
      collection(db, "notifications")
    );

    const notificationList = [];

    querySnapshot.forEach((doc) => {

      notificationList.push({
        id: doc.id,
        ...doc.data()
      });

    });

    setNotifications(notificationList);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          Notifications
        </h1>

        <div className="space-y-4">

          {
            notifications.map((notification) => (

              <div
                key={notification.id}
                className="bg-white p-5 rounded-xl shadow"
              >

                <p className="text-lg">
                  {notification.message}
                </p>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Notifications;