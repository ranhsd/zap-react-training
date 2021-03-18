import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/`,
  timeout: 20 * 60 * 1000
});


const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkJJWiBRQSIsIkVtYWlsIjoiYml6cWFAZ21haWwuY28uaWwiLCJVc2VySWQiOiIxMjk1MDM5IiwiU2Vzc2lvblRva2VuIjoiU2Q4V2VyVTNZdUJ5ZitJSkNTYkk5UUk3eEU3L2ttZlhZZjluTlRvTm5CZk5IMm5uVWY1d05nVjVWdmIyNEpMbmtJSWMyN1VXWFNVPSIsIkJ1c2luZXNzSWQiOiI4MzgzMiIsIlJvbGUiOiIyIiwibmJmIjoxNjE2MDc5Njk1LCJleHAiOjE2MTYwODE1NTUsImlzcyI6InNzby56YXAuY28uaWwiLCJhdWQiOiJCSVotQVBJLXhkanJrbWQ4aTBxbnpiMzYifQ.tPSyM5W0MuIgiR_efNKBYEI3NI4ZOHd8-Cp_u9Q5VLk";

const headers = {
  Authorization: `Bearer ${token}`
};

const getInvoices = (businessId, params) => {
  return instance.get(`business/${businessId}/invoices`, {
    params,
    headers
    // params: {
    //     business_id: params.businessId,
    //     top: params.top,
    //     from: params.from,
    //     to: params.to
    // }
  });
};

const getMonthlyStats = (businessId, params) => {
    return instance.get(`business/${businessId}/statistics/monthly`, {
        params,
        headers
    })
};

export { getInvoices, getMonthlyStats };
