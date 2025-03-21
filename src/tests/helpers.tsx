import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { render, RenderResult } from "@testing-library/react";

export const renderWithRouter = (ui: ReactNode): RenderResult =>
  render(<BrowserRouter>{ui}</BrowserRouter>);