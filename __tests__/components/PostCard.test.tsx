import { render, screen } from "@testing-library/react";
import PostCard from "@/components/posts/PostCard";

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

// Mock next/image
jest.mock("next/image", () => {
  return function MockImage({ alt, src }: { alt: string; src: string }) {
    return <img alt={alt} src={src} />;
  };
});

// Mock Badge component
jest.mock("@/components/ui/Badge", () => {
  return function MockBadge({ label }: { label: string }) {
    return <span>{label}</span>;
  };
});

describe("PostCard", () => {
  const defaultProps = {
    id: 1,
    title: "Test Post Title",
    excerpt: "This is a test excerpt.",
    date: "2026-04-01",
    coverImage: "/images/test.jpg",
  };

  it("renders the post title", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
  });

  it("renders the post excerpt", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("This is a test excerpt.")).toBeInTheDocument();
  });

  it("renders the post date", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("2026-04-01")).toBeInTheDocument();
  });

  it("links to the correct post detail page", () => {
    render(<PostCard {...defaultProps} />);
    const link = screen.getByText("Test Post Title").closest("a");
    expect(link).toHaveAttribute("href", "/posts/1");
  });

  it("renders the cover image", () => {
    render(<PostCard {...defaultProps} />);
    const image = screen.getByAltText("Test Post Title");
    expect(image).toHaveAttribute("src", "/images/test.jpg");
  });

  it("renders without optional props", () => {
    render(<PostCard id={2} title="No extras" excerpt="Basic post" />);
    expect(screen.getByText("No extras")).toBeInTheDocument();
    expect(screen.getByText("Basic post")).toBeInTheDocument();
  });
});
