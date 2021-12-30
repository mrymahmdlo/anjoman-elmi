import React from "react";
import ImageObj from '../../assets/images/letter of appreciations/ImageObj';
import Grid from "@material-ui/core/Grid";
import './Appreciation.css';

export default function ImagesObj() {
    return(
        <div className='appr'>
            <h1 className='appr-topic'>تقدیرنامه ها</h1>
            {/* <Grid container>
                {ImageObj.images.map(item=>(
                    <Grid lg={4} sm={6} xs={12} key={item.id} item>
                        <div className='appr-img'>
                            <img src={item.src} alt={item.name}/>
                        </div>
                    </Grid>
                ))
                }
            </Grid> */}
        </div>
    )
}