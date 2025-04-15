import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>Get Your Fit Together</h1>
      <h2>This is a h2</h2>
      <div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has
        </p>
        <Link href={"questions/about-you"}>
          Get Started With Your Fitness Plan
        </Link>
      </div>
      <div>
        <Link href={"retrieve-plan"}>Retrieve Your Fitness Plan</Link>
      </div>
      <div className="coach-image"></div>
    </div>
  );
}
