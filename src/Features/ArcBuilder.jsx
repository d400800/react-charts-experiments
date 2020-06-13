import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    svg: {
        width: "100%",
        height: "100%",
        border: "1px solid #333"
    }
}));

export default function ArcBuilder() {
    const classes = useStyles();

    const [largeArcFlag, setLargeArcFlag] = useState(1);
    const [sweepFlag, setSweepFlag] = useState(1);
    const [command, setCommand] = useState("A");
    const [rx, setRx] = useState(60);
    const [ry, setRy] = useState(60);
    const [dx, setDx] = useState(60);
    const [dy, setDy] = useState(60);

    function toggleLargeArcFlag() {
        if (largeArcFlag === 1) {
            setLargeArcFlag(0)
        } else {
            setLargeArcFlag(1)
        }
    }

    function toggleSweepFlag() {
        if (sweepFlag === 1) {
            setSweepFlag(0)
        } else {
            setSweepFlag(1)
        }
    }

    function toggleCommand() {
        if (command === "A") {
            setCommand("a")
        } else {
            setCommand("A")
        }
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={largeArcFlag === 1}
                                onChange={toggleLargeArcFlag}
                                name="largeArcFlag"
                            />
                        }
                        label={`Large arc: ${largeArcFlag}`}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={sweepFlag === 1}
                                onChange={toggleSweepFlag}
                                name="sweepFlag"
                            />
                        }
                        label={`Sweep: ${sweepFlag}`}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={command === "A"}
                                onChange={toggleCommand}
                                name="command"
                            />
                        }
                        label={`Command: ${command}`}
                    />
                </FormGroup>

                <Box display="flex">
                    <Box my={1}>
                    <Typography variant="subtitle1" gutterBottom>rx: {rx}</Typography>

                        <ButtonGroup>
                            <Button onClick={e => setRx(rx + 10)}>+</Button>
                            <Button onClick={e => setRx(rx - 10)}>-</Button>
                        </ButtonGroup>
                    </Box>

                    <Box my={1} ml={5}>
                        <Typography variant="subtitle1" gutterBottom>ry: {ry}</Typography>

                        <ButtonGroup>
                            <Button onClick={e => setRy(ry + 10)}>+</Button>
                            <Button onClick={e => setRy(ry - 10)}>-</Button>
                        </ButtonGroup>
                    </Box>
                </Box>

                <Box display="flex">
                    <Box my={1}>
                        <Typography variant="subtitle1" gutterBottom>dx: {dx}</Typography>

                        <ButtonGroup>
                            <Button onClick={e => setDx(dx + 10)}>+</Button>
                            <Button onClick={e => setDx(dx - 10)}>-</Button>
                        </ButtonGroup>
                    </Box>

                    <Box my={1} ml={5}>
                        <Typography variant="subtitle1" gutterBottom>dy: {dy}</Typography>

                        <ButtonGroup>
                            <Button onClick={e => setDy(dy + 10)}>+</Button>
                            <Button onClick={e => setDy(dy - 10)}>-</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box width="300px" height="300px">
                    <svg className={classes.svg} viewport="0 0 100 100">
                        <path d={`M 150 150 ${command} ${rx} ${ry} 0 ${largeArcFlag} ${sweepFlag} ${dx} ${dy}`}></path>
                    </svg>
                </Box>
            </Grid>
        </Grid>
    )
}