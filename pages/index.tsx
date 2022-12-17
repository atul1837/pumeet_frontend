import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useNotifier } from 'react-headless-notifier';

import {
  SuccessNotification,
  InfoNotification,
  WarningNotification,
  DangerNotification
} from '../src/components/notifications';
import { getProfile, updateProfile } from '../src/services/profiling.js'
import { AppLayout } from '../src/components/app-layout';
import styles from '../styles/auth.module.scss';

interface formData {
  preventDefault: any,
  target: candidateForm | any
}

interface candidateForm {
  application_no: { value: string },
  name: { value: string },
  father_name: { value: string },
  mother_name: { value: string },
  date_of_birth: { value: any },
  category: { value: string },
  email: { value: string },
  mobile_no: { value: string },
  gender: { value: string },
  nationality: { value: string },
  correspondance_address: { value: string },
  permanenty_address: { value: string },
  state: { value: string },
  tenth_board: { value: string },
  tenth_marks: { value: string },
  tenth_passing_year: { value: string },
  tenth_certificate: { value: File },
  twelveth_board: { value: string },
  twelveth_makrs: { value: string },
  twelveth_passing_year: { value: string },
  diploma_branch: { value: string },
  diploma_passing_year: { value: string },
  diploma_board: { value: string },
  diploma_institute: { value: string },
  diploma_marks: { value: string },
  all_india_rank: { value: string }
}

function IndexPage() {  
  const { notify } = useNotifier();
  const [authToken, setAuthToken] = React.useState("");
  const [editable, setEditable] = React.useState(true);
  const [profileData, setProfileData] = React.useState({});
  const [formValid, setFormValid] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");
    setAuthToken(AUTH_TOKEN || "");
    if (!AUTH_TOKEN) {
      window.location.replace('/signin');
    } else {
      getProfileHandler();
    }
  }, [])

  const getProfileHandler = async () => {
    try {
      let response: any = await getProfile();
      if(response?.error) {
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        setEditable(false);
        setProfileData(response);
        console.log(response)
      }
    } catch (err: any) {
      setEditable(true)
    }
  }

  const updateProfileHandler = async (params) => {
    let response: any = await updateProfile(params);
    if(response?.error) {
        throw new Error(response?.error);
    } else if (response) {
      return response.data;
    }
  }

  const closeLoading = (message: any) => {
    setTimeout(() => {
      setLoading(false);
      if(message) notify(<SuccessNotification message={message} />);
    }, 2000);    
  }

  const generatePayload = async (form: formData) => {
    return new Promise((resolve, reject) => {
      let params: any = {};
      for (const element of form?.target?.elements) {
        if (element?.type != "submit" && element?.type != "button") {
          if (!!element?.value) {
          params[element?.name] = element?.value;
          } else { setFormValid(false) }
        }
      }
      resolve(params);
    });
  } 

  const handleSubmit = async (form: formData) => {
    form.preventDefault();
    setLoading(true);

    try {
      let clickedBtn = document?.activeElement?.value;
      if (clickedBtn == "Save") {
        await generatePayload(form).then(async (params) => {
          if (!formValid) { notify(<WarningNotification message={"Some fields are empty"} />); }
          let response = await updateProfileHandler(params);
          if (response) {
            closeLoading(response);
            setEditable(false);
          }
        })
      } else if (clickedBtn == "Edit") {
        setEditable(true);
        setLoading(false);
      } else if (clickedBtn == "Submit") {
        await generatePayload(form).then(async (params: any) => {
          if (!formValid) { throw new Error("Some fields are empty") }
          params["submitted"] = true;
          let response = await updateProfileHandler(params);
          if (response) {
            closeLoading(response);
            setEditable(false);
          }
        })
      }
    } catch (err: any) {
      setLoading(false);
      notify(<DangerNotification message={err.message} />);
    }
  }

  if (!authToken || isLoading) {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen bg-white flex justify-center items-center" style={{ zIndex: 1200 }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>
          Home | PU Meet
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          background: "#f6f6f9"
        }}
      >
        <Container maxWidth={false}>
          <div className="px-6 py-2">
            <div className={styles.header}>
              <h2 className="font-medium mb-2 px-1">Your Profile</h2>
            </div>
            <div className={styles.content_wrapper}>
              <div className={styles._box + ` p-6`}>
                
                <form className={styles.form + ` grid gap-x-2 gap-y-2 grid-cols-8`} autoComplete="off" onSubmit={handleSubmit}>
                  <div className="col-span-6">
                    <label htmlFor="application_no">Application No.</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="application_no" id="application_no" placeholder="e.g. 1234567890" />
                    </div>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="name">Full Name</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="name" id="name" placeholder="e.g. Kashish Goyal" />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="email">Email</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="email" name="email" id="email" placeholder="e.g. kashish.profile@gmail.com" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="mobile_no">Phone No.</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="mobile_no" id="mobile_no" placeholder="e.g. +918837678215" />
                    </div>
                  </div>
                  <br />

                  <div className="col-span-2">
                    <label htmlFor="date_of_birth">Date of Birth</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="date" name="date_of_birth" id="date_of_birth" placeholder="e.g. 24-10-2001" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="gender">Gender</label>
                    <select disabled={!editable} defaultValue="male" name="gender" id="gender" className={"p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select> 
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="category">Category</label>
                    <select disabled={!editable} defaultValue="general" name="category" id="category" className={"p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}>
                      <option value="general">General</option>
                      <option value="scheduled_caste">SC</option>
                      <option value="schedule_tribe">ST</option>
                    </select> 
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="nationality">Country</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="nationality" id="nationality" placeholder="e.g. India" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="state">State</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="state" id="state" placeholder="e.g. Punjab" />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="permanenty_address">Permanent Address</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="permanenty_address" id="permanenty_address" placeholder="e.g. #182, Sector 24, Chandigarh" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="correspondance_address">Correspondence Address</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="correspondance_address" id="correspondance_address" placeholder="e.g. #182, Sector 24, Chandigarh" />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="father_name">Father Name</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="father_name" id="father_name" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="mother_name">Mother Name</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="mother_name" id="mother_name" />
                    </div>
                  </div>
                  <br />

                  <div className="col-span-2">
                    <label htmlFor="tenth_board">10th Board</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="tenth_board" id="tenth_board" placeholder="e.g. CBSE" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="tenth_passing_year">10th Passing Year</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="tenth_passing_year" id="tenth_passing_year" placeholder="e.g. 2018" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="tenth_marks">10th Marks(%)</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="tenth_marks" id="tenth_marks" placeholder="e.g. 86.4" />
                    </div>
                  </div>
                  <br />
                  <div className='col-span-2'>
                    <label htmlFor="tenth_certificate">10th Certificate</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="file" name="tenth_certificate" id="tenth_certificate" />
                    </div>
                  </div>
                  <br />
                  <div className="col-span-2">
                    <label htmlFor="twelveth_board">12th Board</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="twelveth_board" id="twelveth_board" placeholder="e.g. CBSE" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="twelveth_passing_year">12th Passing Year</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="twelveth_passing_year" id="twelveth_passing_year" placeholder="e.g. 2018" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="twelveth_marks">12th Marks(%)</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="twelveth_marks" id="twelveth_marks" placeholder="e.g. 86.4" />
                    </div>
                  </div>                  

                  <div className="col-span-6">
                    <label htmlFor="all_india_rank">All India Rank</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="all_india_rank" id="all_india_rank" />
                    </div>
                  </div>                                    

                  <div className="col-span-3">
                    <label htmlFor="diploma_institute">Diploma Institute</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="diploma_institute" id="diploma_institute" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="diploma_branch">Diploma Branch</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="diploma_branch" id="diploma_branch" placeholder="e.g. CSE" />
                    </div>
                  </div>
                  <br />

                  <div className="col-span-2">
                    <label htmlFor="diploma_board">Diploma Board</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="diploma_board" id="diploma_board" placeholder="e.g. PSBTE" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="diploma_passing_year">Diploma Passing Year</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="diploma_passing_year" id="diploma_passing_year" placeholder="e.g. 2018" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="diploma_marks">Diploma Marks(%)</label>
                    <div className={styles.input}>
                      <input disabled={!editable} type="text" name="diploma_marks" id="diploma_marks" placeholder="e.g. 86.4" />
                    </div>
                  </div>
                  <br />

                  <div className="mt-4 col-span-2">
                    <input disabled={profileData?.submitted} type="submit" value={editable ? "Save" : "Edit"} className="theme-btn-outlined mb-4" />
                  </div>
                  <div className="mt-4 col-span-2">
                    <input disabled={profileData?.submitted} type="submit" value={"Submit"} className="theme-btn mb-4" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </>
  )
}

IndexPage.getLayout = (page: any) => (
  <AppLayout>
    {page}
  </AppLayout>
)

export default IndexPage;
