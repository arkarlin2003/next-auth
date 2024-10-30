import Link from "next/link"
export default function Home() {
  return (
   <div>
    <h1>next auth </h1>
       <button><Link href='/login'>Login</Link></button>
   </div>
  );
}
