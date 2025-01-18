import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { FETCH_SUCCESS } from './mocks';

// mock fetch for testing

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(FETCH_SUCCESS),
    })
  );
})




test('renders title', async () => {
  render(<App />);
  const titleElement = screen.getByText("Highly-rated Kickstarter Projects");
  await waitFor(() => {
    expect(titleElement).toBeInTheDocument();
  })
  
});

test('renders prev and next buttons', async () => {
  render(<App />);
  const prevBtn = await screen.findByTestId("prev-btn");
  const nextBtn = await screen.findByTestId("next-btn");
  await waitFor(() => {
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });
});

test('renders table', async () => {
  render(<App />);
  const table = await screen.findByTestId("table");
  await waitFor(() => {
    expect(table).toBeInTheDocument();
  })
  
});

test('renders table rows', async () => {
  render(<App />);
  const table = await screen.findByTestId("table");
  await waitFor(() => {
    expect(table).toBeInTheDocument();
  })
  const rows = table.querySelectorAll('tr');
  expect(rows.length).toBe(6);
});

test('renders table rows with correct data', async () => {
  render(<App />);
  const table = await screen.findByTestId("table");
  await waitFor(() => {
    expect(table).toBeInTheDocument();
  })
  const rows = table.querySelectorAll('tr');
  const firstRow = rows[1];
  const cells = firstRow.querySelectorAll('td');
  expect(cells[0].textContent).toBe('0');
  expect(cells[1].textContent).toBe('186');
  expect(cells[2].textContent).toBe('15823');
});

test('clicking next and prev button should change page', async () => {
  render(<App />);
  
  const table = await screen.findByTestId("table");
  await waitFor(() => {
    expect(table).toBeInTheDocument();
  })
  const nextBtn = await screen.findByTestId("next-btn");
  await waitFor(() => {
    nextBtn.click();
  })
  await waitFor(() => {
    expect(table).toBeInTheDocument();
  })
  const rows = table.querySelectorAll('tr');
  const firstRow = rows[1];
  const cells = firstRow.querySelectorAll('td');
  expect(cells[0].textContent).toBe('5');
  expect(cells[1].textContent).toBe('114');
  expect(cells[2].textContent).toBe('2065');
  const prevBtn = await screen.findByTestId("prev-btn");
  await waitFor(() => {
    prevBtn.click();
  })
  await waitFor(() => {
    expect(table).toBeInTheDocument();
  })
  const newRows = table.querySelectorAll('tr');
  const newFirstRow = newRows[1];
  const newCells = newFirstRow.querySelectorAll('td');
  expect(newCells[0].textContent).toBe('0');
  expect(newCells[1].textContent).toBe('186');
  expect(newCells[2].textContent).toBe('15823');
});
