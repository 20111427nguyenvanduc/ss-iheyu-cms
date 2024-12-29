import React, {useState} from "react"
import ms from "ms"
import _ from "lodash"
import toastr from "toastr"
import Avatar from "@mui/material/Avatar"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import ListSubheader from "@mui/material/ListSubheader"
import IconButton from "@mui/material/IconButton"
import InfoIcon from "@mui/icons-material/Info"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

import {Box, ButtonBase, Checkbox, Divider, Typography, Stack} from "@mui/material"

const ZoomImage = ({data = []}) => {
 const [selected, setSelected] = useState(0)
 const setIndex = (i) => {
  scrollToView(`item-${i}`)
  setSelected(i)
 }

 const prevImg = () => {
  let limit = data.length - 1,
   newIndex = 0
  if (selected <= 0) {
   newIndex = limit
  } else {
   newIndex = selected - 1
  }
  scrollToView(`item-${newIndex}`)
  setSelected(newIndex)
 }

 const nextImg = () => {
  let limit = data.length - 1,
   newIndex = 0
  if (selected >= limit) {
   newIndex = 0
  } else {
   newIndex = selected + 1
  }
  scrollToView(`item-${newIndex}`)
  setSelected(newIndex)
 }

 const scrollToView = (id) => {
  const eleById = document.getElementById(id)
  eleById.scrollIntoView()
 }
 return (
  <Box display='flex' flexDirection='column' gap={1} sx={{width: "100%", height: "100%"}}>
   <Box flexGrow={1} display='flex' alignItems='center' justifyContent='center' position='relative'>
    <ButtonBase onClick={prevImg} sx={{position: "absolute", left: "0px", height: "100%", width: "50px"}}>
     <ArrowBackIosIcon color='primary' />
    </ButtonBase>
    <Box
     component='img'
     sx={{width: "100%", height: "100%", objectFit: "contain", maxHeight: "500px", maxWidth: "100%"}}
     srcSet={`${_.get(data[selected], "img")}?dpr=2 2x`}
     src={`${_.get(data[selected], "img")}`}
     alt={_.get(data[selected], "title")}
     loading='lazy'
    />
    {_.get(data[selected], "title") ? (
     <Box sx={{position: "absolute", bottom: "0px", background: "rgba(0, 0, 0, 0.5)", p: 1, width: "100%"}}>
      <Typography sx={{color: "rgba(255, 255, 255, 0.8)"}}>{_.get(data[selected], "title")}</Typography>
     </Box>
    ) : null}

    <ButtonBase onClick={nextImg} sx={{position: "absolute", right: "0px", height: "100%", width: "50px"}}>
     <ArrowForwardIosIcon color='primary' />
    </ButtonBase>
   </Box>
   <Box sx={{height: data.length > 1 ? "75px" : 0}}>
    <Stack direction='row' spacing={1} sx={{width: "100%", height: "100%", overflowY: "auto", position: "relative"}}>
     {data.length > 1 &&
      data.map((item, i) => {
       let isSelected = selected === i
       return (
        <ButtonBase onClick={() => setIndex(i)} key={item.img}>
         {item.img ? (
          <Box
           id={`item-${i}`}
           component='img'
           sx={{height: "100%", maxWidth: "100px", border: isSelected ? "5px solid blue" : "none"}}
           srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
           src={`${item.img}?w=248&fit=crop&auto=format`}
           alt={item.title}
           loading='lazy'
          />
         ) : (
          <Avatar id={`item-${i}`} alt={item.title} loading='lazy' />
         )}
        </ButtonBase>
       )
      })}
    </Stack>
   </Box>
  </Box>
 )
}

export default ZoomImage
