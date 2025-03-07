import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <Link href={"questions/about-you"}>
          Get Started With Your Fitness Plan
        </Link>
      </div>
      <div>
        <Link href={"retrieve-plan"}>Retrieve Your Fitness Plan</Link>
      </div>
    </div>
  );
}
