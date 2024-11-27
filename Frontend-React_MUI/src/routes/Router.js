import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full-layout/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full-layout/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank-layout/BlankLayout')));
/* ***End Layouts**** */

const ErrorPage = Loadable(lazy(() => import('../views/authentication/Error')));

/* ****Pages***** */
const LoanSizePage = Loadable(lazy(() => import('../views/ola/LoanSizePage')));
const LoanSuggestionPage = Loadable(lazy(() => import('../views/ola/LoanSuggestionPage')));
const FinancialPage = Loadable(lazy(() => import('../views/ola/FinancialPage')));
const PersonalPage = Loadable(lazy(() => import('../views/ola/PersonalPage')));
const LoanDetailPage = Loadable(lazy(() => import('../views/ola/LoanDetailPage')));
const ResultSummaryPage = Loadable(lazy(() => import('../views/ola/ResultSummaryPage')));
const CompletedPage = Loadable(lazy(() => import('../views/ola/CompletedPage')));
const AboutUsPage = Loadable(lazy(() => import('../views/ola/AboutUsPage')));
const ContactUsPage = Loadable(lazy(() => import('../views/ola/ContactUsPage')));
/* ****Routes***** */

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/ola/loansize" /> },
      { path: '/ola/loansize', exact: true, element: <LoanSizePage /> },
      { path: '/ola/loansuggest', exact: true, element: <LoanSuggestionPage /> },
      { path: '/ola/loandetail', exact: true, element: <LoanDetailPage /> },
      { path: '/ola/financeInfo', exact: true, element: <FinancialPage />},
      { path: '/ola/personalInfo', exact: true, element: <PersonalPage />},
      { path: '/ola/resultScreen', exact: true, element: <ResultSummaryPage/>},
      { path: 'ola/completed',  exact: true, element: <CompletedPage />},
      { path: '/ola/aboutUs', exact: true, element: <AboutUsPage/>},
      { path: '/ola/contactUs',  exact: true, element: <ContactUsPage />},
      { path: '*', element: <Navigate to="/ola/auth/404" /> },
    ],
  },
  {
    path: '/ola/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <ErrorPage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
