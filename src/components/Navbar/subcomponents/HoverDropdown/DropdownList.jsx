// Library imports
import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// UI imports
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
// Project imports
import { winWidth } from 'utils';

// Custom styles for component
const dropdownStyles = makeStyles((theme) => ({
    positioner: ({ extendRight }) => ({
        position: 'absolute',
        zIndex: theme.zIndex.appBar + 10,
        marginLeft: 12,
        right: extendRight ? `${extendRight}px` : 'unset',
    }),
    menuWrapper: {
        marginTop: 5,
        fontSize: 18,
        borderTop: `2px solid ${theme.palette.primary.main}`,
        borderTopLeftRadius: '2px !important',
        borderTopRightRadius: '2px !important',
    },
    arrow: ({ extendRight }) => ({
        top: 0,
        right: extendRight ? 0 : 'unset',
        left: extendRight ? 'unset' : 0,
        width: 32,
        height: 8,
        marginTop: '-2.5px',
        position: 'absolute',

        '&::before': {
            borderWidth: '0 8px 8px 8px',
            borderColor: `transparent transparent ${theme.palette.primary.main} transparent`,
            width: 0,
            margin: 'auto',
            height: 0,
            content: '""',
            display: 'block',
            borderStyle: 'solid',
        },
    }),
    listItem: {
        padding: '0 !important',
        maxWidth: 225,
        color: `${theme.palette.secondary.main} !important`,
        '&:hover': {
            backgroundColor: 'rgb(0, 0, 0, 0.05) !important',
            '& a': {
                color: `${theme.palette.primary.main} !important`,
            },
        },

        '&>div:first-of-type': {
            position: 'relative',
            zIndex: 1,
        },
    },
}));

// Cache for window dimensions
let WINDOW_WIDTH = 0;

// Component for positioning and rendering hover dropdown
const DropdownList = ({ list, headerRef, style }) => {
    // Hook for positioning dropdown
    const [extendRight, setExtendRight] = useState(0);
    // Ref for keeping track of dropdown
    const dropdownRef = useRef();

    // Adjust dropdown orientation based on distance from screen edge
    const orientDropdown = () => {
        if (!dropdownRef.current) {
            return;
        }

        // Compute relevant offsets
        const offsetLeft = headerRef.current.offsetLeft + 12;
        const eleWidth = dropdownRef.current.clientWidth;
        const offsetRight = WINDOW_WIDTH - (offsetLeft + eleWidth);

        // Enforce a 4px for buffer with edge of screen
        if (offsetRight < 16) {
            const leftEdge =
                headerRef.current.offsetLeft +
                headerRef.current.clientWidth -
                12;
            const rightHeaderOffset = WINDOW_WIDTH - leftEdge;

            if (extendRight !== rightHeaderOffset) {
                setExtendRight(rightHeaderOffset);
            }
        } else if (extendRight) {
            setExtendRight(0);
        }
    };

    // Browser event controller
    useLayoutEffect(() => {
        function handleResize() {
            // Update window width
            WINDOW_WIDTH = winWidth();
            // Reorient dropdown if necessary
            orientDropdown();
        }

        // Register event handler
        window.addEventListener('scroll', orientDropdown, false);
        window.addEventListener('resize', orientDropdown, false);
        // Invoke resize to start
        handleResize();
        // Cleapup event handler in case of unmount
        return function cleanup() {
            window.removeEventListener('scroll', orientDropdown);
            window.removeEventListener('resize', orientDropdown);
        };
    }, []);

    // CSS classes with props
    const { arrow, listItem, menuWrapper, positioner } = dropdownStyles({
        extendRight,
    });
    // Render
    return (
        <div className={positioner} style={style}>
            <Paper className={menuWrapper}>
                <span className={arrow} />
                <div ref={dropdownRef}>
                    {list &&
                        list.map((item, i) => {
                            return (
                                <ListItem
                                    className={listItem}
                                    button
                                    divider
                                    key={i}
                                >
                                    {item}
                                </ListItem>
                            );
                        })}
                </div>
            </Paper>
        </div>
    );
};

DropdownList.propTypes = {
    list: PropTypes.node, // Page sections JSX
    headerRef: PropTypes.object, // Ref for header DOM
    style: PropTypes.object, // Styles for fade transition passed by parent
};

export default DropdownList;
