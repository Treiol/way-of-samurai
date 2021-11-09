import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:         'https://treig.ddns.net:50005/',
  withCredentials: true
});

export const authApi = {
  // ---------------------------------------------------
  getAuth() {
    return axiosInstance.get('auth/me').then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Auth API: ${response.status} ${response.statusText}`);
          return null;
        }
        return response.data;
      }
    );
  }
  // ---------------------------------------------------
};

export const followApi = {
  // ---------------------------------------------------
  deleteFollow(userId) {
    return axiosInstance.delete(`follow/${userId}`).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Follow API: ${response.status} ${response.statusText}`);
          return null;
        }
        return response.data;
      }
    );
  },
  // ---------------------------------------------------
  postFollow(userId) {
    return axiosInstance.post(`follow/${userId}`).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Follow API: ${response.status} ${response.statusText}`);
          return null;
        }
        return response.data;
      }
    );
  }
  // ---------------------------------------------------
};

export const profileApi = {
  // ---------------------------------------------------
  getProfile(userId) {
    return axiosInstance.get(`profile/${userId}`).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Profile API: ${response.status} ${response.statusText}`);
          return null;
        }
        return response.data;
      }
    );
  }
  // ---------------------------------------------------
};

export const usersApi = {
  // ---------------------------------------------------
  getUsers(currentPage, pageSize) {
    return axiosInstance.get(`users?count=${pageSize}&page=${currentPage}`).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Users API: ${response.status} ${response.statusText}`);
          return null;
        }
        return response.data;
      }
    );
  }
  // ---------------------------------------------------
};