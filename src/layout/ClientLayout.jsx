import React, { useContext } from 'react';
import AuthContext from "../config/context/auth.context";
import AxiosClient from "../config/http-client/axios-client";
import { Button } from "flowbite-react";

const ClientLayout = () => {
    const { user, dispatch } = useContext(AuthContext);
    const layoutStyle = {
        backgroundColor: "#f9f9f9",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
    };

    const headerStyle = {
        marginBottom: "20px",
    };

    const titleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    };

    const detailStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "5px",
    };

    const buttonStyle = {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    };

    const handleSignOut = async () => {
        try {
            await AxiosClient({
                url: "/auth/signout",
                method: "POST",
            });
            dispatch({ type: "SIGN_OUT" });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">
                ¡Bienvenido, {user.user.person.name} {user.user.person.surname}!
            </h1>
            <div className="mb-4 text-center">
                <p className="text-lg font-semibold">
                    Rol: {user.user.roles[0].name}
                </p>
                <p className="text-lg font-semibold">
                    Usuario: {user.user.username}
                </p>
            </div>
            <div className="text-center">
            <Button style={buttonStyle} onClick={handleSignOut}>
                Sign out
            </Button>
            </div>
        </div>
    );
};

export default ClientLayout;
