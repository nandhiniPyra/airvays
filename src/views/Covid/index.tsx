import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import search from '../../assets/icons8-search-30.png'
import exchange from '../../assets/exchange@2x.png';
import BottomGrid from '../Airvays info/index'
import Divider from '@material-ui/core/Divider'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background:'#FFFFFF'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      boxShadow:' 0px 20px 55px #0000001F'
    },
    circle: {
      width: '100px',
      height: '100px',
      borderRadius: ' 50%',
      fontSize: '14px',
      color: '#CCCCCC',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      fontWeight:500,
      border: '2px solid #CCCCCC',
    },
  }),
)

export default function CovidUpdate() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          {/* <Paper className={classes.paper}> */}
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              marginTop: '30px',
            }}
          >
            <div className={classes.circle}>COVID ENTRY CHECK</div>
          </div>

          <div
            style={{
              marginTop: '30px',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography
              style={{ color: '#333333', fontWeight: 500, width: '600px' }}
            >
              From Covid-19 hot zones to safe green zones, find out all you need
              to know before booking and taking an international trip.
            </Typography>
          </div>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <div>
              <Formik
                initialValues={{ email: '' }}
                onSubmit={async (values) => {
                  await new Promise((resolve) => setTimeout(resolve, 500))
                  alert(JSON.stringify(values, null, 2))
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email().required('Required'),
                })}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                  } = props
                  return (
                    <form onSubmit={handleSubmit}>
                      <Grid container>
                        <Grid
                          item
                          xs={11}
                          style={{
                            display: 'flex',
                          }}
                          spacing={1}
                        >
                          <TextField
                          fullWidth
                            // style={{ width: '340px' }}
                            id="email"
                            placeholder="From"
                            label="From"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.email && touched.email
                                ? 'text-input error'
                                : 'text-input'
                            }
                          />
                          <br />

                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                          <div
                            style={{
                              marginTop: '10px',
                              marginLeft: '10px',
                              marginRight: '10px',
                            }}
                          >
                            <img
                              src={exchange}
                              style={{ width: '24px', height: '24px' }}
                            />
                          </div>
                          <TextField
                          fullWidth
                            // style={{ width: '340px' }}
                            id="email"
                            placeholder="To"
                            label="To"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.email && touched.email
                                ? 'text-input error'
                                : 'text-input'
                            }
                          />

                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                        </Grid>

                        <Grid
                          item
                          xs={1}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                          }}
                        >
                          <Button
                            type="submit"
                            style={{
                              background: '#33BBFF',
                              width: '35px',
                              height: '54px',
                            }}
                            disabled={isSubmitting}
                          >
                            <img
                              src={search}
                              style={{ width: '24px', height: '24px' }}
                            />
                          </Button>
                        </Grid>

                        {/* <button
                          type='button'
                          className='outline'
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                          Reset
                        </button> */}
                      </Grid>
                    </form>
                  )
                }}
              </Formik>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <div style={{ marginTop: '250px' }}>
      <Divider style={{ marginTop: '20px' }} />
        <BottomGrid />
      </div>
    </div>
  )
}
