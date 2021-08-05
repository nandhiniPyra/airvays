import React,{} from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import OtpInput from 'react-otp-input';
import { Container } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function VerifyOTP(props:any) {
    const [open, setOpen] = React.useState(false);
    const {openOtp,closeOtp}=props;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                onClose={()=>closeOtp()}
                aria-labelledby='customized-dialog-title'
                open={openOtp}
                fullWidth
                maxWidth='xs'
            >
                <DialogTitle id='customized-dialog-title' onClose={()=>closeOtp()}>
                    <Typography variant='h6' align='center'>
                        {'OTP Verification'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Container component='main' maxWidth='xs'>
                        <Typography>
                            Enter 4-digit OTP code sent to your E-mail ID
                        </Typography>
                        <div
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                marginBottom: '40px',
                                marginTop: '40px',
                            }}
                        >
                            <OtpInput
                                value={''}
                                // onChange={handleChange}
                                numInputs={4}
                                separator={<span>&nbsp;</span>}
                                inputStyle={OTPStyle}
                                shouldAutoFocus={true}
                                placeholder={'0000'}
                            />
                        </div>
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '40px',
                                marginBottom: '40px',
                            }}
                        >
                            <Button
                                autoFocus
                                onClick={handleClose}
                                style={{
                                    backgroundColor: '#33BBFF',
                                    color: '#FFFFFF',
                                    textTransform: 'none',
                                }}
                            >
                                Verify Code
                            </Button>
                        </div>
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                        >
                            <Typography>Resend Code</Typography>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </div>
    );
}
const OTPStyle = {
    height: '50px',
    width: '45px',
    fontSize: '1.2em',
    background: '#FFFFFF',
    borderRadius: '5px',
    marginRight: '10px',
    border: '1px red',
};
