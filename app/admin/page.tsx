import { notFound, redirect } from "next/navigation";

import { getCurrentUser, isAdmin } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login?next=/admin");
  if (!(await isAdmin(user.id))) notFound();

  return null;
}
