import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import MainPage from '../pages/mainPage/components/MainPage';
import ErrorPage from '../pages/errorPage/components/ErrorPage';
import Details from '../modules/details';
import Page404 from '../pages/page404/components/Page404';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<MainPage />}>
        <Route path="details" element={<Details />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
