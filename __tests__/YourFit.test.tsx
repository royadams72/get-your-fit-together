/**
 * @jest-environment jsdom
 */

import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { reduxMock } from "@/__mocks__/reduxMock";
import { journeySliceMock } from "@/__mocks__/rootStateMock";
import { useAppSelector } from "@/lib/hooks/storeHooks";

import { LoaderProvider } from "@/context/Loader/LoaderProvider";
import YourFit from "@/app/your-custom-fit/components/YourFit";

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

const mockUsePathname = jest.fn();
const mockDispatch = jest.fn();
const scrollIntoViewMock = jest.fn();
const scrollByMock = jest.fn();
let mockUseRouter: jest.Mock;
const mockRouterPush = jest.fn();

jest.mock("@/lib/hooks/storeHooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));
// Redepoluyy
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => mockUsePathname(),
}));

describe("CategoryItem Component", () => {
  let store: any;

  const renderYourFit = async () =>
    await act(async () =>
      render(
        <LoaderProvider>
          <Provider store={store}>
            <YourFit />
          </Provider>
        </LoaderProvider>
      )
    );

  beforeEach(() => {
    store = makeStore();
    jest.spyOn(console, "error").mockImplementation(() => {});
    mockUseRouter = jest.requireMock("next/navigation").useRouter;
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
      prefetch: jest.fn(),
      replace: jest.fn(),
      pathname: "/",
      route: "/",
      query: {},
      asPath: "/",
      refresh: jest.fn(),
    });

    mockUsePathname.mockImplementation(() => "/your-custom-fit");

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

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === "/api/check-for-user") {
        // getting issues as it calls check user
        return Promise.resolve({
          json: () => Promise.resolve({ exists: false }),
        });
      }
      if (url === "/api/save-plan") {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ success: true }),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });

    jest.clearAllMocks();
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
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

  it("should submit user form to save plan", async () => {
    const component = await renderYourFit();

    const userName = component.container.querySelector("#userName");
    const userPassword = component.container.querySelector("#userPassword");
    const button = screen.getByRole("button", { name: /Save your plan/i });

    await act(async () => {
      if (userName && userPassword) {
        fireEvent.change(userName, { target: { value: "userName" } });
        fireEvent.change(userPassword, { target: { value: "password123" } });
      }
      fireEvent.click(button);
    });

    expect(mockRouterPush).toHaveBeenCalled();

    expect(mockDispatch).toHaveBeenCalled();
  });
});
