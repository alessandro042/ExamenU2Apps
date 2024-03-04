import React, { useContext } from "react";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import AxiosClient from "../config/http-client/axios-client";
import AuthContext from "../config/context/auth.context";
import { useNavigate } from "react-router-dom";
const SinginPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      try {
        const response = await AxiosClient({
          url: "/auth/signin",
          method: "POST",
          data: values,
        });
        if (!response.error) {
          //Validar que error tiene -> Redireccionar a su pagina principal
          const rol = response.data.roles[0].name;
          switch (rol) {
            case "ADMIN_ROLE":
              dispatch({ type: "SIGN_IN", payload: response.data });
              navigate("/", { replace: true });
              break;
            case "USER_ROLE":
              dispatch({ type: "SIGN_IN", payload: response.data });
              navigate("/usuario", { replace: true });
              break;
            case "CLIENT_ROLE":
              dispatch({ type: "SIGN_IN", payload: response.data });
              navigate("/client", { replace: true });
              break;
            default:
              break;
          }
        } else throw Error("Error");
      } catch (error) {
        customAlert(
          "Iniciar sesion",
          "Usuario y/o contraseña incorrectos",
          "info"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <form
      className="flex flex-col items-center gap-4 max-w-md mx-auto"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <div className="w-full">
        <div className="mb-2">
          <Label
            htmlFor="username"
            value="Your username"
            style={{ color: "black" }}
          />
        </div>
        <TextInput
          type="text"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.errors.username && formik.touched.username ? (
              <span className="text-red-600">{formik.errors.username}</span>
            ) : null
          }
          placeholder=""
          required
        />
      </div>
      <div className="w-full">
        <div className="mb-2">
          <Label
            htmlFor="password1"
            value="Your password"
            style={{ color: "black" }}
          />
        </div>
        <TextInput
          id="password1"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.errors.password && formik.touched.password ? (
              <span className="text-red-600">{formik.errors.password}</span>
            ) : null
          }
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" style={{ color: "black" }}>
          Remember me
        </Label>
      </div>
      <Button
        type="submit"
        color="light"
        className="w-full"
        disabled={formik.isSubmitting || !formik.isValid}
      >
        {formik.isSubmitting ? (
          <Spinner />
        ) : (
          <>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
            Iniciar sesion
          </>
        )}
      </Button>
    </form>
  );
};
export default SinginPage;
