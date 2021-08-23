import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, InputAdornment } from '@material-ui/core';
// import ColorCode from '../helpers/ColorCode';

const useStyles = makeStyles({
    inputStyle: {
        // color: ColorCode.black,
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 10,
    },
    inputInlineStyle: {
        // color: ColorCode.black,
        fontSize: 14,
        borderBottom: '1px solid #CECECE',
        borderWidth: 2,
    },
    borderLine: {
        fontSize: 14,
        // color: ColorCode.black,
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
const InputComp = (props) => {
    const classes = useStyles();

    return (
        <div>
            {props.labeldisplay ? <Typography style={Object.assign({})}>{props.labelValue}</Typography> : null}
            <TextField
                {...props}
                style={Object.assign({}, { marginTop: 6, borderRadius: 5 }, { ...props.style })}
                placeholder={props.placeholder}
                InputProps={{
                    disableUnderline: true,
                    classes: { input: classes.inputStyle },
                    endAdornment: props.suffix ? (
                        <InputAdornment position="end">{props.suffix}</InputAdornment>
                    ) : (
                        props.inputiconend && <img src={props.inputiconend} style={{ ...props.iconStyle }} />
                    ),
                    startAdornment: props.prefix ? (
                        <InputAdornment position="start">{props.prefix}</InputAdornment>
                    ) : (
                        props.inputiconstart && <img src={props.inputiconstart} style={{ ...props.iconStyle }} />
                    ),
                }}
                inputProps={{
                    style: { textAlign: props.textalignment ? props.textalignment : 'center', paddingLeft: 10 },
                }}
            />
        </div>
    );
};

export default InputComp;
