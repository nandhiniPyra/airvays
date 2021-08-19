import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import ColorCode from '../helpers/ColorCode';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    inputStyle: {
        color: ColorCode.black,
        fontSize: 14,
    },
    inputInlineStyle: {
        color: ColorCode.black,
        fontSize: 14,
        marginBottom: 8,
        borderBottom: '1px solid #CECECE',
        borderWidth: 2,
    },
    borderLine: {
        fontSize: 14,
        color: ColorCode.black,
        marginTop: 7,
    },
    underline: {
        '&&&:before': {
            borderBottom: '1px solid #ccc ',
        },
        '&&:after': {
            borderBottom: 'none',
        },
    },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CustomizedSelects = (props) => {
    const classes = useStyles();

    return (
        <>
            {props.multipleselect ? (
                <TextField
                    {...props}
                    select
                    placeholder={props.placeholder}
                    style={Object.assign({}, { marginTop: 6, borderRadius: 5, padding: 10 }, { ...props.style })}
                    InputProps={{
                        disableUnderline: true,
                        classes: { input: classes.inputStyle },
                        startAdornment: <img src={props.inputicon} style={{ ...props.iconStyle }} />,
                        endAdornment: <img src={props.inputicon} style={{ ...props.iconStyle }} />,
                    }}
                    SelectProps={{
                        IconComponent: ExpandMoreIcon,
                        multiple: true,
                        placeholder: 'Select',
                        MenuProps: MenuProps,
                        renderValue: (selected) => {
                            return props.options
                                .filter((item) => selected.indexOf(item.id) !== -1)
                                .map((item) => item.value)
                                .toString();
                        },
                    }}
                >
                    {props.options &&
                        props.options.map((block, index) => (
                            <MenuItem key={index} value={block.id}>
                                <Checkbox checked={props.slist.indexOf(block.id) > -1} />
                                <ListItemText primary={block.value} />
                            </MenuItem>
                        ))}
                </TextField>
            ) : (
                <div>
                    {props.labeldisplay && <Typography style={Object.assign({})}>{props.labelValue}</Typography>}
                    <TextField
                        {...props}
                        select
                        placeholder={props.placeholder}
                        style={Object.assign({}, { marginTop: 6, borderRadius: 5 }, { ...props.style })}
                        InputProps={{
                            disableUnderline: true,
                            classes: { input: classes.inputStyle },
                            startAdornment: <img src={props.inputicon} style={{ ...props.iconStyle }} />,
                            endAdornment: <img src={props.inputicon} style={{ ...props.iconStyle }} />,
                        }}
                    >
                        {props.options &&
                            props.options.map((option) => (
                                <MenuItem key={option.id} data-my-value={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                </div>
            )}
        </>
    );
};

export default CustomizedSelects;
