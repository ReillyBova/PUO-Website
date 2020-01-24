// Library imports
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// UI imports
import Button from '@material-ui/core/Button';

// A button component for activating the mobile menu
const HamburgerMenu = ({ classes, menuIsActive, setMenuState }) => {
    // CSS classes
    const { hamburger, hamburgerWrapper } = classes;

    // Useful path properties for the custom SVG element
    const hamburger_style = {
        fill: 'none',
        fillRule: 'evenodd',
        strokeWidth: 3,
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 4,
        strokeDasharray: 'none',
        strokeOpacity: 1,
    };
    // Render
    return (
        <div className={hamburgerWrapper}>
            <Button
                className={clsx(hamburger, menuIsActive && 'active')}
                onClick={() => setMenuState(!menuIsActive)}
                aria-label='Toggle Menu'
            >
                <svg>
                    <path
                        id='menuButtonL0'
                        d='M 0,30.5 H 32'
                        style={hamburger_style}
                    />
                    <path
                        id='menuButtonL1'
                        d='M 0,23.25 H 32'
                        style={hamburger_style}
                    />
                    <path
                        id='menuButtonL2'
                        d='M 0,16 H 32'
                        style={hamburger_style}
                    />
                    <path
                        id='menuButtonL3'
                        d='M 0,8.75 H 32'
                        style={hamburger_style}
                    />
                    <path
                        id='menuButtonL4'
                        d='M 0,1.5 H 32'
                        style={hamburger_style}
                    />
                </svg>
            </Button>
        </div>
    );
};

HamburgerMenu.propTypes = {
    classes: PropTypes.object, // Styling classes
    menuIsActive: PropTypes.bool, // Boolean that holds state of mobile dropdown
    setMenuState: PropTypes.func, // Function for toggling mobile dropdown
};

export default HamburgerMenu;
