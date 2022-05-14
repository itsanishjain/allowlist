import Navigation from "./Navigation";

const Layout = ({ children }) => (
  <div>
    <Navigation />
    {children}
  </div>
);

export default Layout;
