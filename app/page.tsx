import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"questions/about-you"}>
        Get Started With Your Fitness Plan
      </Link>
    </div>
  );
}
