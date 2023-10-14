import { AxiosInstance } from "axios";
import { notification } from "antd";

const setupRequest = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      // Thêm cấu hình để gửi kèm cookie
      config.withCredentials = true;

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

const setupResponse = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 422) {
        return notification.error({
          message: "Notification Title",
          description: `Invalid data` || "Error system",
          duration: 5,
          placement: "top",
        });
      }
      if (error.response.status === 409) {
        return notification.error({
          message: "Notification Title",
          description: `Conflict data` || "Error system",
          duration: 5,
          placement: "top",
        });
      }
      notification.error({
        message: "ERROR",
        description: error?.response?.data?.message || "Error system",
        duration: 5,
        placement: "top",
      });

      return Promise.reject(error);
    }
  );
};

export { setupRequest, setupResponse };
