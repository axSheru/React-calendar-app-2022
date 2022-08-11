import { useCalendarStore } from "../../hooks";


export const FABDelete = () => {

    const { startDeletingEvent, activeEvent } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    };

    return (
        <button
            aria-label="btn-delete"
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            style={{
                display: !!activeEvent ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    );
};
