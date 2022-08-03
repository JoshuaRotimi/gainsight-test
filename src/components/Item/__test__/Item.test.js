import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Item from "../Item";
import App from "../../../App";


test('render data object correctly', async () => {
    render(<Item data={{commit: {message: 'Hi', author: {name: 'Jay', date: '15th Oct 2021'}}}} />);
    const itemElements = await screen.findAllByTestId(/itemBox/i);
    expect(itemElements[0]).toBeInTheDocument();
    expect(itemElements.length).toBe(1)
});