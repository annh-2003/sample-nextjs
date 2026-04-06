import { findUserByEmail, createUser } from "@/app/lib/users-store";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return Response.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return Response.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  if (findUserByEmail(email)) {
    return Response.json(
      { error: "Email already registered" },
      { status: 409 }
    );
  }

  const user = createUser({ name, email, password });

  return Response.json(
    { id: user.id, name: user.name, email: user.email },
    { status: 201 }
  );
}
