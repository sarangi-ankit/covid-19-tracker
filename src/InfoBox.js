import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./InfoBox.css"

function InfoBox({title,cases,total}) {
    return (
        <>
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    <h2>{title}</h2>
                </Typography>
                
                <h2 className="infoBox__cases">{cases}</h2>
                
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
        </>
    )
}

export default InfoBox
