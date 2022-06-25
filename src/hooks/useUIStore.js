import { useSelector, useDispatch } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";


export const useUIStore = () => {

    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    };

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    };

    // ? Función de prueba para un toggle.
    const toggleDateModal = () => {
        ( isDateModalOpen )
            ? openDateModal()
            : closeDateModal()
    };

    return {
        //* Propiedades.
        isDateModalOpen,

        //* Métodos.
        openDateModal,
        closeDateModal,
        toggleDateModal,
    };

};