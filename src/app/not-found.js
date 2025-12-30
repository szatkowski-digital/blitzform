import { redirect, notFound } from "next/navigation";

export default function NotFound() {
  return redirect(404);
}
