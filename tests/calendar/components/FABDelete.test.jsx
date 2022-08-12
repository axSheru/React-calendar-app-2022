import { fireEvent, render, screen } from "@testing-library/react";
import { FABDelete } from "../../../src/calendar/components/FABDelete";
import { useCalendarStore } from "../../../src/hooks";

jest.mock( '../../../src/hooks' )

describe('Pruebas en <FABDelete />.', () => {

    const mockStartDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test( 'Debe de mostrar el estado default del componente correctamente.', () => {

        useCalendarStore.mockReturnValue({
            activeEvent: false
        });

        render(<FABDelete />);
        
        const btn = screen.getByLabelText( 'btn-delete' );

        expect( btn.classList ).toContain( 'btn' );
        expect( btn.classList ).toContain( 'btn-danger' );
        expect( btn.classList ).toContain( 'fab-danger' );
        expect( btn.style.display ).toBe( 'none' );

    });

    test( 'Debe de mostrar el botón si hay un evento activo.', () => {

        useCalendarStore.mockReturnValue({
            activeEvent: true
        });

        render(<FABDelete />);

        // screen.debug();// Para mostrar cómo se muestra el componente que se está renderizando.
        
        const btn = screen.getByLabelText( 'btn-delete' );

        expect( btn.style.display ).toBe( '' );

    });

    test('Debe de llamar a startDeletingEvent si hay un evento activo.', () => {

        useCalendarStore.mockReturnValue({
            activeEvent: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render(<FABDelete />);

        // screen.debug();// Para mostrar cómo se muestra el componente que se está renderizando.
        
        const btn = screen.getByLabelText( 'btn-delete' );

        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalled();

    });

});