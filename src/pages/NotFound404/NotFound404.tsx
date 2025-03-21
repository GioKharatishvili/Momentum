import { Link } from "react-router";

export const NotFound404 = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-6xl font-bold">404</h1>
    <p className="text-xl mt-4">Page not found</p>
    <Link to="/" className="mt-6 text-blue-500 hover:underline">
      Go back home
    </Link>
  </div>
);
