/**
 * @jest-environment jsdom
 */
import {render, screen, it, renderHook} from "@testing-library/react"
import React from "react";
import { Navbar } from '../Navbar'


test('should render component', ()=>{

    const component = render(<Navbar/>);
    expect(component.container).toBe;
})