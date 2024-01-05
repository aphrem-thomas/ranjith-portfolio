'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Jobs() {
  const router = useRouter();
  useEffect(() => {
    router.push('/jobs/1');
 }, []);
  return (
    <>
    Redirecting...
    </>
  );
}

export default Jobs;
