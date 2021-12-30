import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import './Footer.css';

export default function Footer() {
    return(
        <div className='footer'>
            <div className='content footer__content'>
                <div className='footer-title' style={{paddingTop: 24, paddingBottom: 0}}>
                <Typography variant='h5' component='h5' className='title-item'>
                انجمن فیزیولوژی و ورزشی ایران
                </Typography>
                </div>
                <Grid
                    container
                    className='grid'
                    spacing={3}
                    direction='row'
                    justifyContent='space-around'
                >
                    <Grid item className='item' xs={12} sm={4}>
                        <Typography variant='body1' component='h6' style={{color:'#fff'}}>
                            درباره انجمن
                        </Typography>
                        <Divider variant='fullWidth' className='divider' />
                        <Typography variant='body2' component='p'>
                            اطلاعات در مورد سایت افزوده شود
                        </Typography>
                    </Grid>
                    <Grid item className='item' xs={12} sm={4}>
                        <Typography variant='body1' component='h6' style={{color:'#fff'}}>
                            ارتباط با انجمن
                        </Typography>
                        <Divider variant='fullWidth' className='divider' />
                        <Typography className='footer-title' variant='body2' component='p'>
                            0921212121-32323232
                            <CallIcon style={{marginLeft: 10}} />
                        </Typography>
                        <Typography className='footer-title' variant='body2' component='p'>
                            تهران
                            <LocationOnIcon style={{marginLeft: 10}} />
                        </Typography>
                        <Typography className='footer-title' variant='body2' component='p'>
                            info@ds.ir
                            <EmailIcon style={{marginLeft: 10}} />
                        </Typography>
                    </Grid>
                </Grid>
            </div> 
        </div>
    )
}