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
        borderBottom: `2px solid ${theme.palette.text.secondary}`,
        borderLeft: `2px solid ${theme.palette.text.secondary}`
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

const dataSet = [
    [28, 16], [29, 20], [25, 14], [25, 22], [21, 12],
    [30, 17], [33, 16], [35, 17], [38, 22], [39, 25],
    [40, 24], [45, 25], [49, 29], [43, 33], [41, 37],
    [50, 27], [55, 30], [56, 33], [58, 40], [59, 35],
    [75, 35], [70, 36], [78, 39], [76, 29], [77, 45],
    [90, 50], [92, 55], [95, 50], [99, 60], [94, 70],
    [100, 65],
    [120, 60],
].map(p => {
    return [p[0] * 2, p[1] * 4]
})

export default function GraphBuilder() {
    const graphH = 300;
    const classes = useStyles();

    const [d, setD] = useState("");

    const [coeff, setCoeff] = useState(1);
    const [param, setParam] = useState(0);

    const [data, setData] = useState(dataSet);

    const [dataString, setDataString] = useState(() => dataToString(dataSet))

    function drawFn(coeff, param) {
        // example: y = 2x + 1;
        let d = "";

        const y = (x) => {
            return (parseFloat(coeff) * x) + parseFloat(param);
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

    function drawDataPoints(data) {
        return data.map((datum, i) => {
            const [x, y] = datum;

            return (
                <circle key={i} className={classes.dataPoint} cx={x} cy={graphH - y} r="1.5"></circle>
            );
        })
    }

    function calcCostFnResult(data, hypothesisFn, param1) {
        let sum = 0;

        for (const [x, y] of data) {

            sum += Math.pow((hypothesisFn(param1, x) - y), 2);
        }

        return (1 / 2 * data.length) * sum;
    }

    function findCostFunction(data) {
        let results = {};

        for (let i = 0; i < 1; i = i + 0.025) {
            
            const hypothesisFn = (i, x) => i * x;

            const result = calcCostFnResult(data, hypothesisFn, i);
            
            results[result] = i;
        }
        
        const minimum = Math.min(...Object.keys(results));

        console.log(results[minimum]);

        setCoeff(Math.round(results[minimum] * 1000) / 1000);
    }

    function graduallyDescend(data) {
        const learningRate = 0.000055;

        let results = {};

        const h = (param1, x) => {
            return param1 * x;
        };

        let theta1 = 1.5;

        for (const [x, y] of data) {
            let temp = theta1 - learningRate * ((h(theta1, x) - y) * x);

            if (temp > 0 && temp < 1) {
                results[temp] = theta1;
            }

            // results[theta1] = temp;
            
            theta1 = temp;
        }

        const minimum = Math.min(...Object.keys(results));

        console.log(results, minimum);
        console.log(results);

        setCoeff(results[minimum]);
    }

    function handleDataSetChange(dataString) {
        const regExp = (/(\[\d*,\s?\d*\])/g);

        const matches = dataString.matchAll(regExp);

        let arr = [];

        for (const match of matches) {
            arr.push(match[0]);
        }

        console.log(arr);
        //setData(arr);
    }

    function dataToString(data) {
        let string = '';

        for (const [x, y] of data) {
            string += `[${x}, ${y}],`;
        }

        return string;
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={4}>
                <Box>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="standard-textarea"
                            label="data set"
                            placeholder="Placeholder"
                            multiline
                            onChange={e => setDataString(e.target.value)}
                            value={dataString}
                            rows={3}
                            fullWidth
                            variant="outlined"
                        />
                    </form>

                    <Box my={2}>
                        <Button variant="contained" color="primary" onClick={e => handleDataSetChange(dataString)}>
                            Update date set
                        </Button>
                    </Box>
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

                <Box my={2}>
                    <Divider/>
                </Box>

                <Box my={2}>
                    <Button variant="contained" color="primary" onClick={e => findCostFunction(data)}>Find cost function</Button>
                </Box>

                <Box my={2}>
                    <Button variant="contained" color="primary" onClick={e => graduallyDescend(data)}>Gradually descent</Button>
                </Box>
            </Grid>

            <Grid item xs={8}>
                <Box height={graphH}>
                    <svg className={classes.svg} viewport="0 0 100 100">
                        {drawDataPoints(data)}

                        <path className={`${classes.path} ${classes.line}`} d={`M 0 ${graphH} ${d}`}></path>
                    </svg>
                </Box>
            </Grid>
        </Grid>
    )
}