import Axios from 'axios';

export const getUsers = (currentPage, pageSize) => {
  return Axios.get(
    `https://treig.ddns.net:50005/users?count=${pageSize}&page=${currentPage}`,
    { withCredentials: true }
  );
};