import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import MainPage from '../pages/mainPage/components/MainPage';
import ErrorPage from '../pages/errorPage/components/ErrorPage';
import Details from '../modules/details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<MainPage />}>
        <Route path="details" element={<Details />} />
      </Route>
    </Route>
  )
);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
