import { notFound } from "next/navigation";

/** Rewrite target when admin IP gate fails — triggers the default Next.js 404. */
export default function AdminDeniedPage() {
  notFound();
}
