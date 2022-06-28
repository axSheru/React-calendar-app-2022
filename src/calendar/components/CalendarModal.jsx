import { addHours, differenceInSeconds } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import ReactModal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUIStore } from "../../hooks";

registerLocale( 'es', es );

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement( '#root' );

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUIStore();

    const { activeEvent } = useCalendarStore();

    const [ formSubmited, setformSubmited ] = useState( false );

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 )
    });

    const titleClass = useMemo(() => {

        if ( ! formSubmited ) return '';

        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid';

    }, [ formValues.title, formSubmited ]);

    useEffect(() => {

        if ( activeEvent !== null ) {
            setFormValues({ ...activeEvent });
        }

    }, [ activeEvent ])
    

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        });
    };

    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [ changing ]: event
        });
    };

    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = ( event ) => {
        event.preventDefault();
        setformSubmited( true );

        const difference = differenceInSeconds( formValues.end, formValues.start );

        if ( isNaN( difference ) || difference <= 0 ) {
            Swal.fire( 'Fechas incorrectas', 'Revisa las fechas ingresadas.', 'error' );
            return;
        }

        if ( formValues.title.length <= 0 ) {
            return;
        }

    };

    return (
        <ReactModal
            className='modal'
            closeTimeoutMS={ 200 }
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            overlayClassName='modal-fondo'
            style={ customStyles }
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        className="form-control"
                        dateFormat="Pp"
                        locale="es"
                        onChange={ ( event ) => onDateChanged( event, 'start' ) }
                        selected={ formValues.start }
                        showTimeSelect
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        className="form-control"
                        dateFormat="Pp"
                        locale="es"
                        minDate={ formValues.start }
                        onChange={ ( event ) => onDateChanged( event, 'end' ) }
                        selected={ formValues.end }
                        showTimeSelect
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ titleClass }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </ReactModal>
    );
};
