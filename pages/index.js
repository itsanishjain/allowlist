import Link from "next/link";

const Home = () => {
  return (
    <div>
      <p>Home Page</p>

      <Link href='/login'>
        <a>Login</a>
      </Link>
    </div>
  );
};

export default Home;
