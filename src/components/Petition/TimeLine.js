import * as React from "react"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import {Box, Typography, Stack} from "@mui/material"
import {timelineItemClasses} from "@mui/lab/TimelineItem"

export default function TimelinePetition() {
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
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((log, index) => {
     return (
      <TimelineItem>
       <TimelineSeparator>
        <TimelineDot sx={{background: "#007CFE", border: "3px solid #E5F1FF", padding: "8px", boxShadow: "none", margin: 0}} />
        {9 !== index + 1 ? <TimelineConnector sx={{background: "rgba(21, 137, 216, .3)"}} /> : null}
       </TimelineSeparator>
       <TimelineContent sx={{paddingTop: "0", paddingRight: 0}}>
        <Stack direction='column' justifyContent='start' alignItems='start' spacing={1}>
         <Typography component='h3' sx={{fontSize: "16px", fontWeight: 500, color: "#010810"}}>
          Tiếp nhận phản ánh
         </Typography>
         <Typography component='h3' sx={{fontSize: "16px", fontWeight: 400, color: "#2E3236"}}>
          29/12/2024 08:00
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
