import React, { useContext } from "react";
import SigninPage from "../modules/SigninPage";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import AuthContext from "../config/context/auth.context";
import UserLayout from "../layout/UserLayout";
import ClientLayout from "../layout/ClientLayout";
import AdminLayout from "../layout/AdminLayout";

const AppRouter = () => {
    const { user } = useContext(AuthContext); //Context = payload => /api/auth
    //Toda mi aplicación sabe que datos de mi usuario tengo disponibles
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {user.signed ? (
                    <>
                        {user.roles[0]?.name === "ADMIN_ROLE" && (
                            <Route path="/" element={<AdminLayout />}>
                                <Route
                                    path="admin"
                                    element={
                                        <>
                                            {user.user.person?.name +
                                                " " +
                                                user.user.person?.surname +
                                                " " +
                                                `${user.user.person?.lastname ?? ""}` +
                                                " - " +
                                                user?.roles[0]?.name +
                                                " \nusername:" +
                                                user.user.username}
                                        </>
                                    }
                                />
                            </Route>
                        )}
                        {user.roles[0]?.name === "USER_ROLE" && (
                            <Route path="/" element={<UserLayout />}>
                                <Route
                                    path="usuario"
                                    element={
                                        <>
                                            {user.user.person?.name +
                                                " " +
                                                user.user.person?.surname +
                                                " " +
                                                `${user.user.person?.lastname ?? ""}` +
                                                " - " +
                                                user?.roles[0]?.name +
                                                " \nusername:" +
                                                user.user.username}
                                        </>
                                    }
                                />
                            </Route>
                        )}
                        {user.roles[0]?.name === "CLIENT_ROLE" && (
                            <Route path="/" element={<ClientLayout />}>
                                <Route
                                    path="client"
                                    element={
                                        <>
                                            {user.user.person?.name +
                                                " " +
                                                user.user.person?.surname +
                                                " " +
                                                `${user.user.person?.lastname ?? ""}` +
                                                " - " +
                                                user?.roles[0]?.name +
                                                " \nusername:" +
                                                user.user.username}
                                        </>
                                    }
                                />
                            </Route>
                        )}
                    </>
                ) : (
                    <Route path="/" element={<SigninPage />} />
                )}
                <Route path="/*" element={<>404 not found</>} />
            </>
        )
    );
    return <RouterProvider router={router} />;
};

export default AppRouter;
