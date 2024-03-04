import React, { useContext } from 'react';
import AuthContext from "../config/context/auth.context";
import { Button } from "flowbite-react";

const UserLayout = () => {
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

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                    ¡Bienvenido, {user.user.person.name} {user.user.person.surname}!
                </h1>
                <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-700">
                        Rol: {user.user.roles[0].name}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Usuario: {user.user.username}
                    </p>
                </div>
                <Button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Cerrar sesión
                </Button>
            </div>
        </div>
    );
};

export default UserLayout;
