// Library imports
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
// UI imports
import Fade from '@material-ui/core/Fade';
// Local imports
import DropdownList from './DropdownList';

// Dropdown that appears when hovering over desktop navbar links
const HoverDropdown = ({ header, list }) => {
    // Hook for showing dropdown menu
    const [showList, setVisibility] = useState(false);
    // Ref for keeping track of where the dropdown grows from
    const headerRef = useRef();
    // Render
    return (
        <div onMouseLeave={() => setVisibility(false)} ref={headerRef}>
            <div onMouseEnter={() => setVisibility(true)}>{header}</div>
            <Fade in={showList} unmountOnExit>
                <DropdownList list={list} headerRef={headerRef} />
            </Fade>
        </div>
    );
};

HoverDropdown.propTypes = {
    header: PropTypes.node, // Page header JSX
    list: PropTypes.node, // Page sections JSX
};

export default HoverDropdown;
