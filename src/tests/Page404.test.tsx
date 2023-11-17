import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Page404 from '../pages/page404/components/Page404';

jest.mock('../assets/foot-prints.svg', (): void => require('./__mock__/image-page-404'));

describe('404 Page', () => {
  it('displays the 404 page when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Routes>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </MemoryRouter>
    );

    const notFoundElement = screen.getByTestId('page-404');
    expect(notFoundElement).toBeInTheDocument();
  });
});
