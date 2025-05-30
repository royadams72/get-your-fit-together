/**
 * @jest-environment jsdom
 */

import React, { act } from "react";

import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import YourFit from "@/app/your-custom-fit/components/YourFit";
import { reduxMock } from "@/__mocks__/reduxMock";
import { LoaderProvider } from "@/context/Loader/LoaderProvider";
import { JourneyState, JourneyStore } from "@/types/interfaces/journey";
import { journeySliceMock } from "@/__mocks__/rootStateMock";
import { useAppSelector } from "@/lib/hooks/storeHooks";

// // Mock the Redux hooks
// jest.mock("@/lib/hooks/store.hooks", () => ({
//   useAppSelector: jest.fn(),
// }));

const userReducer = () => reduxMock.user;
const uiDataReducer = () => reduxMock.uiData;
const journeyDataReducer = () => journeySliceMock;

const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      user: userReducer,
      uiData: uiDataReducer,
      journey: journeyDataReducer,
    }),
  });
};

const mockDispatch = jest.fn();
jest.mock("@/lib/hooks/storeHooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));
const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => mockUsePathname(),
}));
const scrollIntoViewMock = jest.fn();
const scrollByMock = jest.fn();

describe("CategoryItem Component", () => {
  let store: any;
  // let mockUseAppSelector: jest.Mock;
  // const submitMock = jest.fn();
  beforeEach(() => {
    store = makeStore();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    Object.defineProperty(window, "scrollIntoView", {
      value: scrollByMock,
      writable: true,
    });

    Object.defineProperty(window, "scrollBy", {
      value: scrollByMock,
      writable: true,
    });

    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn(store.getState())
    );
    mockUsePathname.mockImplementation(() => "/your-custom-fit");
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it("should render YourFit", () => {
    render(
      <LoaderProvider>
        <Provider store={store}>
          <YourFit />
        </Provider>
      </LoaderProvider>
    );
    expect(YourFit).toBeTruthy();
  });

  it("should submit", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true }),
    });
    const result = await act(async () =>
      render(
        <LoaderProvider>
          <Provider store={store}>
            <YourFit />
          </Provider>
        </LoaderProvider>
      )
    );

    // console.log(store.getState().journey.journey.journeyData);
    // screen.debug();
    const userName = result.container.querySelector("#userName");
    const userPassword = result.container.querySelector("#userPassword");
    const button = screen.getByRole("button", { name: /Save your plan/i });

    await act(async () => {
      if (userName && userPassword) {
        fireEvent.change(userName, { target: { value: "userName" } });
        fireEvent.change(userPassword, { target: { value: "password123" } });
      }
      fireEvent.click(button);
    });
    expect(mockDispatch).toHaveBeenCalled();
  });
});
