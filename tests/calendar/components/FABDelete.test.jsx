import { render, screen } from "@testing-library/react";
import { FABDelete } from "../../../src/calendar/components/FABDelete";
import { useCalendarStore } from "../../../src/hooks";

jest.mock( '../../../src/hooks' )

describe('Pruebas en <FABDelete />.', () => {

    test( 'Debe de mostrar el componente correctamente.', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });

        render(<FABDelete />);
        
        const btn = screen.getByLabelText( 'btn-delete' );

        expect( btn.classList ).toContain( 'btn' );
        expect( btn.classList ).toContain( 'btn-danger' );
        expect( btn.classList ).toContain( 'fab-danger' );
        expect( btn.style.display ).toBe( 'none' );

    });

});