import Navigation from "./Navigation";
import { useRouter } from 'next/router';


const Layout = ({ children }) => {
  const router = useRouter();

  return (

    <div>
      {router.pathname !== '/[id]' && <Navigation />}
      {children}
    </div>
  )
}

export default Layout;
