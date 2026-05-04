import React, { createContext, useState, useCallback } from "react";
import Notification from "../components/common/Notification/Notification";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, showNotification, removeNotification }}
    >
      {children}

      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{ top: `${20 + index * 70}px`, position: "fixed", right: "20px", zIndex: 2000 }}
        >
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
