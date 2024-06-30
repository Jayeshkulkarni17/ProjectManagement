// import { useAuth } from "../components/useAuth";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//     const { isAuthenticated } = useAuth();
//     return (
//         <>
//             {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
//         </>
//     );
// };

// export const PublicRoute = () => {
//     const { isAuthenticated } = useAuth();
//     return (
//         <>
//             {!isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
//         </>
//     );
// };

// export default PrivateRoute;
import { useAuth } from "../components/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export const PublicRoute = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            {!isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export default PrivateRoute;
