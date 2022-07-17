import { addHours } from "date-fns";
import { useCalendarStore, useUIStore } from "../../hooks";


export const FABAddNew = () => {

    const { openDateModal } = useUIStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#DEA1F9',
            user: {
                id: 123,
                name: 'Alex'
            }
        });
        openDateModal();
    };

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    );
};
