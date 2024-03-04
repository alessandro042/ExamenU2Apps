import React, { useContext } from "react";
import AuthContext from "../config/context/auth.context";
import AxiosClient from "../config/http-client/axios-client";
import { Button } from "flowbite-react";

const AdminLayout = () => {
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

    const handleSignOut = () => {
        AxiosClient({
            url: "/auth/signout",
            method: "POST",
        });
        dispatch({ type: "SIGN_OUT" });
    };

    return (
        <div style={layoutStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>
                    Welcome, {user.user.person.name} {user.user.person.surname}
                </h1>
                <div>
                    <p style={detailStyle}>
                        Role: {user.user.roles[0].name}
                    </p>
                    <p style={detailStyle}>
                        Username: {user.user.username}
                    </p>
                </div>
            </div>
            <Button style={buttonStyle} onClick={handleSignOut}>
                Sign out
            </Button>
        </div>
    );
};

export default AdminLayout;
