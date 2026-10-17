import { notFound, redirect } from "next/navigation";

import { getCurrentAdmin, getCurrentUser } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login?next=/admin");
  if (!(await getCurrentAdmin())) notFound();

  return null;
}
