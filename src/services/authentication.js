import axios from 'axios';

export async function AuthRegistration(params) {
  console.log('AuthRegistration: ', params);
  let returnData = null;
  await axios({
    method: 'POST',
    url: 'http://localhost:8000/auth/registration/',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      returnData = response;
    })
    .catch((error) => {
      returnData = error.data;
    });

  return returnData;
}

export async function AuthLogin(params) {
  console.log('params: ', params);
  let config = {
    url: 'http://localhost:8000/auth/login/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(params),
  };
  console.log("config", config);
  console.log('AuthLogin: ', params);
  let returnData = null;
  await axios(config)
    .then((response) => {
      returnData = response;
      console.log("response", response);
      localStorage.setItem("AUTH_TOKEN", response.data.key);
    })
    .catch((error) => {
      returnData = error.data;
    });

  return returnData;
}

export async function AuthLogout() {
  console.log('Req AuthLogout...');
  localStorage.removeItem('AUTH_TOKEN');
  window.location.replace('/signin');
  return true;
}

// export async function AuthCheckEmailExist(params) {
//   let returnData = null;
//   await request('/api/user-management/has-email-registered/', {
//     method: 'POST',
//     data: params,
//   })
//     .then((response) => {
//       returnData = response;
//     })
//     .catch((error) => {
//       returnData = error.data;
//     });
//   return returnData;
// }

// export async function checkEmailExistsInV1Api({ data }) {
//   let returnData = null;
//   await request('/api/user-management/has-email-registered-on-v1/', {
//     method: 'POST',
//     data,
//   })
//     .then((response) => {
//       returnData = response;
//     })
//     .catch((error) => {
//       returnData = error.data;
//     });
//   return returnData;
// }
// export async function GetSetCroveSession() {
//   let returnData = null;
//   await request('/api/user-management/session/', {
//     method: 'GET',
//   })
//     .then((response) => {
//       returnData = response;
//     })
//     .catch((error) => {
//       returnData = error.data;
//     });
//   console.log('GetSetCroveSession : ', returnData);
//   return returnData;
// }

// export async function ResendVerificationEmail(params) {
//   console.log('ResendVerificationEmail: ', params);
//   let returnData = null;
//   await request('/api/user-management/resend-confirmation-email/', {
//     method: 'POST',
//     data: params,
//     disableGlobalErrorHandler: true,
//   })
//     .then((response) => {
//       returnData = response;
//     })
//     .catch((error) => {
//       returnData = error.data;
//     });
//   return returnData;
// }
