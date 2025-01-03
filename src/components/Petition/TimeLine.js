import React, {useEffect, useState, Fragment} from "react"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import {Box, Typography, Stack} from "@mui/material"
import {timelineItemClasses} from "@mui/lab/TimelineItem"
import {getLogJob as getLogJobPetition} from "../../services/petition"
import moment from "moment"

export default function TimelinePetition({idSelected}) {
 const [dataLogPetition, setDataLogPetition] = React.useState([])

 useEffect(() => {
  getLog()
 }, [idSelected])

 const getLog = () => {
  getLogJobPetition({_id: idSelected}).then((res) => {
   if (_.get(res, "code") === 200) {
    setDataLogPetition(_.get(res, "data"))
   }
  })
 }

 return (
  <Box p={2}>
   <Typography component='h3' sx={{fontSize: "16px", fontWeight: 500, color: "#010810"}}>
    Tiến trình xử lý
   </Typography>
   <Timeline
    sx={{
     paddingTop: 2,
     [`& .${timelineItemClasses.root}:before`]: {
      flex: 0,
      padding: 0,
      alignItems: "start",
     },
    }}
   >
    {dataLogPetition.map((log, index) => {
     return (
      <TimelineItem key={index}>
       <TimelineSeparator>
        <TimelineDot sx={{background: "#007CFE", border: "3px solid #E5F1FF", padding: "8px", boxShadow: "none", margin: 0}} />
        {dataLogPetition.length !== index + 1 ? <TimelineConnector sx={{background: "rgba(21, 137, 216, .3)"}} /> : null}
       </TimelineSeparator>
       <TimelineContent sx={{paddingTop: "0", paddingRight: 0}}>
        <Stack direction='column' justifyContent='start' alignItems='start' spacing={1}>
         <Typography component='h3' sx={{fontSize: "16px", fontWeight: 500, color: "#010810"}}>
          {_.get(log, "description")}
         </Typography>
         <Typography component='h3' sx={{fontSize: "16px", fontWeight: 400, color: "#2E3236"}}>
          {moment(_.get(log, "updatedAt")).format("DD/MM/YYYY HH:mm")}
         </Typography>

         <Typography component='h3' sx={{fontSize: "12px", fontWeight: 400, color: "#2E3236"}}>
          {_.get(log, "user.name")}
         </Typography>
        </Stack>
       </TimelineContent>
      </TimelineItem>
     )
    })}
   </Timeline>
  </Box>
 )
}
