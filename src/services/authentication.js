import axios from 'axios';

export async function AuthRegistration(params) {
  console.log('AuthRegistration: ', params);
  let returnData = null;
  await axios.post('http://localhost:8000/auth/registration/', {
    method: 'POST',
    data: JSON.stringify(params),
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
  console.log('AuthLogin: ', params);
  let returnData = null;
  await axios.post('http://localhost:8000/auth/login/', {
    method: 'POST',
    // headers: {
    //   Authorization: "Token  " + authToken
    // },
    data: params,
  })
    .then((response) => {
      returnData = response;
      // localStorage.setItem("AUTH_TOKEN", response.key);
    })
    .catch((error) => {
      returnData = error.data;
    });
  
  return returnData;
}

export async function AuthLogout() {
  console.log('Req AuthLogout...');
  localStorage.removeItem('AUTH_TOKEN');
  window.location.replace("/signin");
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

