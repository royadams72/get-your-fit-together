/**
 * @jest-environment node
 */
import { PATHS } from "@/routes.config";
import { useClientFetch } from "@/lib/hooks/useClientFetch";
const mockUsePathname = jest.fn();
let mockUseRouter: jest.Mock;
const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => mockUsePathname(),
}));

describe("useClientFetch", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
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
  });
  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("it should redirect if an error", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ error: "This is a known error", redirect: true }),
      })
    );
    const clientFetch = useClientFetch();
    await clientFetch("/api/someroute/", "this is info");
    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining(
        `${PATHS.ERROR}?error=${encodeURIComponent("This is a known error")}`
      )
    );

    //
  });

  it("it should redirect if a network error occurs", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );
    const clientFetch = useClientFetch();
    await clientFetch("/api/someroute/", "this is info");
    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining(
        `${PATHS.ERROR}?error=${encodeURIComponent(
          "Error saving data: Error: Network error"
        )}`
      )
    );

    //
  });
});
