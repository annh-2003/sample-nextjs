import { render, screen } from "@testing-library/react";
import Header from "@/app/components/Header";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Header", () => {
  it("renders the Blog Admin title", () => {
    render(<Header />);
    expect(screen.getByText("Blog Admin")).toBeInTheDocument();
  });

  it("has a link to the homepage", () => {
    render(<Header />);
    const homeLink = screen.getByText("Blog Admin");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("has a link to the Posts page", () => {
    render(<Header />);
    const postsLink = screen.getByText("Posts");
    expect(postsLink.closest("a")).toHaveAttribute("href", "/posts");
  });

  it("renders the avatar placeholder", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });
});
