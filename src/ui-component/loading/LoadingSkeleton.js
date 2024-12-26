import React from "react"
import { styled, useTheme } from "@mui/material/styles"
import { Skeleton } from "@mui/material"

//3rd
import _ from "lodash"

const LoadingSkeleton = ({ loading, ...props }) => {
 const theme = useTheme()

 return loading ? <Skeleton animation='wave' {...props} /> : null
}

export default LoadingSkeleton
