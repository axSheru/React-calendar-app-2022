import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { store } from "./store";

export const CalendarApp = () => {
    return (
        <Provider store={ store }>
            <BrowserRouter>
            {/* El HashRouter se utiliza para tener como parte de la ruta raiz un # y dirigir a la URL posterior al mismo. */}
            {/* <HashRouter> */}
                <AppRouter />
            {/* </HashRouter> */}
            </BrowserRouter>
        </Provider>
    );
};
