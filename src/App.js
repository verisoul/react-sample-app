import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginLogout from './views/LoginLogout';
import ResultsView from "./views/Results";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginLogout />,
    },
    {
        path: "/results",
        element: <ResultsView />,
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
