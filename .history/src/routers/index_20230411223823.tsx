import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';

export default createBrowserRouter([
    {
        path: '/',
        element: <Layout />
    }
])