import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app/App';

jest.mock('../pages/mainPage/components/MainPage', () => (): JSX.Element => <>Mock Main Page</>);
jest.mock('../modules/details', () => (): JSX.Element => <>Mock Details Page</>);
jest.mock('../pages/page404/components/Page404', () => (): JSX.Element => <>Mock Not Found Page</>);
jest.mock('../pages/errorPage/components/ErrorPage', () => (): JSX.Element => <>Mock Error Page</>);
jest.mock('../modules/header', () => (): JSX.Element => <>Mock Header</>);

describe('App', () => {
  it('renders the home page by default', async () => {
    await waitFor(() => render(<App />));
    expect(screen.getByText(/Mock Main Page/i)).toBeInTheDocument();
  });
});
