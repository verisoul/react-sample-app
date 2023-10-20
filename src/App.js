import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginSignup from './views/LoginSignup';
import RealUser from './views/RealUser';
import FakeSuspiciousUser from './views/FakeSuspiciousUser';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginSignup />,
    },
    {
        path: "/real",
        element: <RealUser />,
    },
    {
        path: "/fake",
        element: <FakeSuspiciousUser />,
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
