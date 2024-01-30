"use client";

import { useSearchParams } from "next/navigation";

const Redirect = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  /**
   * 1. sign up/ sign in dulu (next auth?)
   * 2. connect do notion -> pake useEffect langsung simpan code nya di db (hit API nest js)
   * 3. ...
   */
  return (
    <>
      <p>{code}</p>
      <div>Redirect</div>
    </>
  );
};

export default Redirect;
