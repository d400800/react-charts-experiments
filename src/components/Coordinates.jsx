import React, { useState } from 'react';

export default function Coordinates() {
    const [coordinates, setCoordinates] = useState("50,50");

    function handleChange(coordinates) {
        setCoordinates(coordinates);
        drawGraph(coordinates);
    }

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

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="standard-textarea"
                    label="coordinates"
                    placeholder="Placeholder"
                    multiline
                    onChange={e => handleChange(e.target.value)}
                    value={coordinates}
                    rows={3}
                    fullWidth
                    variant="outlined"
                />
            </form>

            <Box my={2}>
                <Button variant="contained" color="primary" onClick={e => drawGraph(coordinates)}>Draw graph</Button>
            </Box>
        </>
    );
} 
