import { useCalendarStore, useUIStore } from "../../hooks";


export const FABDelete = () => {

    const {  } = useCalendarStore();

    const handleClickNew = () => {
        
    };

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleClickNew }
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    );
};
