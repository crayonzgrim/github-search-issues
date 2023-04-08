import { createBrowserRouter } from 'react-router-dom';
import {
  RootPage,
  ErrorPage,
  RegisteredPage,
  IssueListPage
} from '../components/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/lists',
    element: <RegisteredPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/issues',
    element: <IssueListPage />,
    errorElement: <ErrorPage />
  }
]);
