import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { Audio } from  'react-loader-spinner';


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
      checkAuthToken();
    }, []);

    if ( status === 'checking' ) {
        return (
            <>
                <div className="center-loader">
                    <Audio
                        height="100"
                        width="100"
                        color='#347CF7'
                        ariaLabel='loading'
                        />
                    <h3>Cargando...</h3>
                </div>
            </>
        );
    }

    return (
        <Routes>
            {
                ( status === 'not-authenticated' )
                ? (
                    <>
                        <Route path="/auth/*" element={ <LoginPage /> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>
                )
                : (
                    <>
                        <Route path="/" element={ <CalendarPage /> } />
                        <Route path="/*" element={ <Navigate to="/" /> } />
                    </>
                )
            }
        </Routes>
    );
};
