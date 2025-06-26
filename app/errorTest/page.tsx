import { response } from "@/lib/services/response.service";

export default async function TestRedirectPage() {
  await response("Testing server redirect", true); // ⬅️ This will redirect immediately
  return null; // not reached
}
