
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


test('shortens the URL successfully', async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve('abcd123'),
      ok: true,
    })
  );

  render(<App />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'http://example.com' } });
  fireEvent.click(screen.getByText('Shorten'));

  await waitFor(() => {
    expect(screen.getByText('URL Shortened Successfully! click it copy ot')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  global.fetch.mockClear();
});

test('shows invalid URL warning', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({ status: 300 });

  render(<App />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'invalid-url' } });
  fireEvent.click(screen.getByText('Shorten'));

  await waitFor(() => {
    expect(screen.getByText('Invalid Url')).toBeInTheDocument();
  });

  global.fetch.mockClear();
});


test('copies short URL to clipboard', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ json: () => Promise.resolve('abcd123'), ok: true });
    
    render(<App />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'http://example.com' } });
    fireEvent.click(screen.getByText('Shorten'));
  
    await waitFor(() => {
      expect(screen.getByText('URL Shortened Successfully! click it copy ot')).toBeInTheDocument();
    });
  
    const writeTextMock = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
    });
  
    fireEvent.click(screen.getByText('http://localhost:4000/r/abcd123'));
  
    expect(writeTextMock).toHaveBeenCalledWith('http://localhost:4000/r/abcd123');
  
    global.fetch.mockClear();
  });
  