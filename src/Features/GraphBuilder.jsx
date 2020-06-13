import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    svg: {
        width: "100%",
        height: "100%",
        border: `1px solid ${theme.palette.primary.main}`
    },
    path: {
        strokeWidth: 2,
        strokeLinecap: "square",
        fill: "none"
    },
    line: {
        stroke: theme.palette.secondary.main
    },
    dataPoint: {
        fill: theme.palette.info.main
    }
}));

export default function GraphBuilder() {
    const graphH = 300;
    const classes = useStyles();

    const [coordinates, setCoordinates] = useState("50,50");
    const [d, setD] = useState("");

    const [coeff, setCoeff] = useState(1);
    const [param, setParam] = useState(0);

    const [dataPoints, setDataPoints] = useState(() => {
        const data = [[30, 20], [40, 24]];

        return data;
    });

    function drawGraph(coordinates) {
        let d = "";

        const cArr = coordinates
            .split(" ").join("")
            .split("|");
        
        for (const cPair of cArr) {
            const cPairArr = cPair.split(",");

            d += `L ${cPairArr[0] || 0} ${graphH - (parseInt(cPairArr[1]) || 0)} `
        }

        setD(d);
    }

    function handleChange(coordinates) {
        setCoordinates(coordinates);
        drawGraph(coordinates);
    }

    function drawFn(coeff, param) {
        // example: y = 2x + 1;
        let d = "";

        const y = (x) => {
            return (parseInt(coeff) * x) + parseInt(param);
        };

        for(let x = 0; x < 1000; x++) {
            d += `L ${x} ${graphH - y(x)}`    
        }

        setD(d);
    }

    function onCoeffChange(coeff) {
        setCoeff(coeff);
    }

    function onParamChange(param) {
        setParam(param);
    }

    function drawDataPoints(dataPoints) {
        return dataPoints.map((datum, i) => {
            const [x, y] = datum;

            return (
                <circle key={i} className={classes.dataPoint} cx={x} cy={graphH - y} r="3"></circle>
            );
        })
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={4}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="standard-textarea"
                        label="coordinates"
                        placeholder="Placeholder"
                        multiline
                        onChange={e => handleChange(e.target.value)}
                        value={coordinates}
                        rows={8}
                        fullWidth
                        variant="outlined"
                    />
                </form>

                <Box my={2}>
                    <Button variant="contained" color="primary" onClick={e => drawGraph(coordinates)}>Draw graph</Button>
                </Box>

                <Box my={2}>
                    <Divider/>
                </Box>

                <Box display="flex">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                type="number"
                                id="fn-coefficient"
                                label="coefficient"
                                placeholder="coefficient"
                                variant="outlined"
                                value={coeff}
                                size="small"
                                onChange={e => onCoeffChange(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                type="number"
                                id="fn-parameter"
                                label="parameter"
                                placeholder="parameter"
                                variant="outlined"
                                value={param}
                                size="small"
                                onChange={e => onParamChange(e.target.value)}
                            />  
                        </Grid>
                    </Grid>

                </Box> 
                

                <Box my={2}>
                    <Button variant="contained" color="primary" onClick={e => drawFn(coeff, param)}>Draw fn</Button>
                </Box>

                {/* <Box>
                    <Typography variant="caption">{d.toString()}</Typography>
                </Box> */}
            </Grid>

            <Grid item xs={8}>
                <Box height={graphH}>
                    <svg className={classes.svg} viewport="0 0 100 100">
                        {drawDataPoints(dataPoints)}

                        <path className={`${classes.path} ${classes.line}`} d={`M 0 ${graphH} ${d}`}></path>
                    </svg>
                </Box>
            </Grid>
        </Grid>
    )
}