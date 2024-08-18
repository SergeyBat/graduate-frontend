const API = 'http://localhost:8080/api';

const URL = {
  SIGN_IN: `${API}/auth/signin`,
  SIGN_UP: `${API}/auth/signup`,
  EVENT_TYPES: `${API}/event-types`,
  ADMIN_COMPANY: `${API}/admin-company`,
  COMPANY: `${API}/company`,
  ONE_COMPANY_REVIEWS: (id) => `${API}/company-reviews/company/${id}`,
  COMPANY_REVIEWS: `${API}/company-reviews`,
  ADMIN_USERS: `${API}/admin-users`,
  COMPANY_EVENTS: `${API}/company-events`,
  EVENT_REQUESTS: `${API}/event-request`,
  USER_INFO: `${API}/users/profile`,
  MINIO: `${API}/minio`,
};

export default URL;
