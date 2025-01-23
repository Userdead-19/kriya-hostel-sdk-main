import axios from "axios";

export const BASE_URL = "https://kriyadb.psgtech.ac.in/api";

export const EVENT_URL = `${BASE_URL}/event`;

export const MAIL_URL = `${BASE_URL}/mail`;

export const fetchEvents = () => axios.get(EVENT_URL, {});

export const fetchStatistics = () => axios.get(`${BASE_URL}/statistics`, {});

export const fetchCollegeStats = () =>
  axios.get(`${BASE_URL}/statistics/college-stats`, {});

export const fetchEventStats = () =>
  axios.get(`${BASE_URL}/statistics/event-stats`, {});
export const fetchWorkshopStats = () =>
  axios.get(`${BASE_URL}/statistics/workshop-stats`, {});
export const fetchPaperStats = () =>
  axios.get(`${BASE_URL}/statistics/paper-stats`, {});

export const fetchEventDetails = (id) =>
  axios.get(`${BASE_URL}/register/users-from-event/${id}`, {});
export const fetchPaperDetails = (id) =>
  axios.get(`${BASE_URL}/paper/users-from-paper/${id}`, {});
export const fetchWorkDetails = (id) =>
  axios.get(`${BASE_URL}/payment/workshop-payment-details/${id}`, {});

export const fetchReferralStats = () =>
  axios.get(`${BASE_URL}/statistics/referral-stats`, {});

export const fetchAccommodationDetails = () =>
  axios.get(`${BASE_URL}/statistics/accommodation-details`, {});

export const fetchMasterAccommodation = () =>
  axios.get(`${BASE_URL}/acc/stats`, {});

export const fetchAccommodationDetailsbyEmail = (email) =>
  axios.get(`${BASE_URL}/acc/email/${email}`, {});

export const fetchAccommodationDetailsbyKriyaId = (kriyaId) =>
  axios.get(`${BASE_URL}/acc/kriyaId/${kriyaId}`, {});

export const fetchAccPaid = () =>
  axios.get(`${BASE_URL}/acc/paid`, {});

export const fetchUpdateAccommodation = (email, data) =>
  axios.put(`${BASE_URL}/acc/email/${email}`, data);

export const fetchPaperUsers = (id) =>
  axios.get(`${BASE_URL}/paper/users-from-paper/${id}`, {});

export const fetchGraphData = (hr) =>
  axios.get(`${BASE_URL}/statistics/graph-stats/${hr}`, {});

export const fetchMailData = (type, id) =>
  type === "TRANSACTION"
    ? axios.get(`${MAIL_URL}/txn/${id}`, {})
    : axios.get(`${MAIL_URL}/kriya/${id}`, {});

export const fetchSendMail = (type, id) =>
  type === "TRANSACTION"
    ? axios.post(`${MAIL_URL}/txn/${id}`, {})
    : axios.post(`${MAIL_URL}/kriya/${id}`, {});

export const fetchDeptWise = () =>
  axios.get(`${BASE_URL}/statistics/dept-wise`, {});
