import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://54.229.37.92";
export const AppURL = "http://54.229.37.92";

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
setAuthHeader(localStorage.getItem("access"));

const saveToken = (response) => {
  localStorage.setItem("refresh", response.data.refresh);
  localStorage.setItem("access", response.data.access);
};

const destroyToken = () => {
  localStorage.removeItem("refresh");
  localStorage.removeItem("access");
};

function createAxiosResponseInterceptor() {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Reject promise if usual error

      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axiosInstance.interceptors.response.eject(interceptor);
      const refreshToken = localStorage.getItem("refresh");
      return axiosInstance
        .post("/api/auth/refresh/", {
          refresh: refreshToken,
        })
        .then((response) => {
          saveToken(response);
          setAuthHeader(response.data.access);
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.access;
          return axiosInstance(error.response.config);
        })
        .catch((error) => {
          destroyToken();

          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
}
createAxiosResponseInterceptor();

export default axiosInstance;
