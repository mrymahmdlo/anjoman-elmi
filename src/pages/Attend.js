import React, {useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import ToFarsiNumber from '../componenets/common-components/Converter';
import NumberCreator from "../componenets/common-components/NumberCreator";
import { CircularProgress } from '@material-ui/core';
import './PhilosPage.css';
import banknote from '../assets/images/banknotes-icon.png';
import location from '../assets/images/location-icon.png';

const base='http://charity.mykanoon.ir/api';

export default function Attend() {

    const [data, setData]=useState();
    useEffect(()=> {
        fetch(base+'/Tehran/PhilanthropistGroup').then((response)=>
            response.json().then((response)=>setData(response))
        );
    }, []);

    return (
        <>
        <h1 className='appr-topic'> انجمن فیزیولوژی و ورزشی ایران </h1>
        <h2><a href ="https://survey.prsln.ir/s/l0w76lx">لینک عضویت</a></h2>
        { data ?  (
        <Grid className='philo-content' container>
            {data?.philanthropists.map((item)=>(
                <Grid lg={4} sm={6} xs={12} item key={item.id}>
                    
                </Grid>
            ))}
        </Grid>
        ) : (
            <CircularProgress style={{marginTop: '10vh'}} />
        )}
        </>
    )
}
