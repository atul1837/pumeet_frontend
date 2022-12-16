import { useRouter } from 'next/router';

import Head from 'next/head';
import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useNotifier } from 'react-headless-notifier';

import {
  SuccessNotification,
  InfoNotification,
  WarningNotification,
  DangerNotification,
} from '../../../src/components/notifications';
import { getCandidateDetail } from '../../../src/services/staff/candidates.js';
import { AppLayout } from '../../../src/components/app-layout';

function CandidateDetailPage() {
  const router = useRouter();
  const { candidate_id } = router.query;
  const { notify } = useNotifier();
  const [authToken, setAuthToken] = React.useState('');
  const [editable, setEditable] = React.useState(true);
  const [candidateDetail, setCandidateDetail] = React.useState({});
  const [formValid, setFormValid] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    setAuthToken(AUTH_TOKEN || '');
    if (!AUTH_TOKEN) {
      window.location.replace('/signin');
    } else {
      candidate_id && getCandidateDetailHandler();
    }
  }, [candidate_id]);

  const getCandidateDetailHandler = async () => {
    try {
      let response: any = await getCandidateDetail(candidate_id);
      if (response?.error) {
        notify(<DangerNotification message={'You are not allowed on this view'} />);
        window.location.replace('/staff');
        throw new Error(response?.error);
      } else if (response) {
        response = response.data;
        setCandidateDetail(response);
        console.log(response);
      }
    } catch (err: any) {
      notify(<DangerNotification message={'You are not allowed on this view'} />);
      window.location.replace('/staff');
      setEditable(true);
    }
  };

  if (!authToken || isLoading) {
    return (
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-white flex justify-center items-center"
        style={{ zIndex: 1200 }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Staff | PU Meet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          background: '#f6f6f9',
        }}
      >
        <Container maxWidth={false}>
          <div className="px-6 py-2">
            {candidateDetail && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Candidate Detail</h1>
                    <h3>{candidateDetail?.name}</h3>
                    <h3>{candidateDetail?.application_no}</h3>
                    <h3>{candidateDetail?.mobile_no}</h3>
                    <h3>{candidateDetail?.email}</h3>
                    <h3>{candidateDetail?.father_name}</h3>
                    <h3>{candidateDetail?.mother_name}</h3>
                    <h3>{candidateDetail?.date_of_birth}</h3>
                    <h3>{candidateDetail?.category}</h3>
                    <h3>{candidateDetail?.mobile_no}</h3>
                    <h3>{candidateDetail?.gender}</h3>
                    <h3>{candidateDetail?.nationality}</h3>
                    <h3>{candidateDetail?.correspondance_address}</h3>
                    <h3>{candidateDetail?.permanenty_address}</h3>
                    <h3>{candidateDetail?.state}</h3>
                    <h3>{candidateDetail?.tenth_board}</h3>
                    <h3>{candidateDetail?.tenth_marks}</h3>
                    <h3>{candidateDetail?.tenth_passing_year}</h3>
                    <h3>{candidateDetail?.tenth_certificate}</h3>
                    <h3>{candidateDetail?.tweleveth_board}</h3>
                    <h3>{candidateDetail?.tweleveth_makrs}</h3>
                    <h3>{candidateDetail?.tweleveth_passing_year}</h3>
                    <h3>{candidateDetail?.tweleveth_certificate}</h3>
                    <h3>{candidateDetail?.diploma_branch}</h3>
                    <h3>{candidateDetail?.diploma_passing_year}</h3>
                    <h3>{candidateDetail?.diploma_board}</h3>
                    <h3>{candidateDetail?.diploma_institute}</h3>
                    <h3>{candidateDetail?.diploma_marks}</h3>
                    <h3>{candidateDetail?.diploma_certificate}</h3>
                    <h3>{candidateDetail?.all_india_rank}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Box>
    </>
  );
}

CandidateDetailPage.getLayout = (page: any) => <AppLayout>{page}</AppLayout>;

export default CandidateDetailPage;
