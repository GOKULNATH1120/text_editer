import './App.css';
import Index from './pages/Index';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/index",
      element: <Index />,
    },

  ]);
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
