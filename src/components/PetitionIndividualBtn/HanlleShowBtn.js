/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import BtnTuChoiPhanAnh from "./BtnTuChoiPhanAnh"
import BtnBaoTrung from "./BtnBaoTrung"
import BtnChuyenXuLy from "./BtnChuyenXuLy"
import BtnTuChoiXuLy from "./BtnTuChoiXuLy"
import BtnTiepNhanXuLy from "./BtnTiepNhanXuLy"

const HandleShowBtn = ({children, dataSelected}) => {
 return (
  <React.Fragment>
   {/* Trạng thái chờ tiếp nhận phản ánh  */}
   {!_.get(dataSelected, "statusJob") ? (
    <React.Fragment>
     <BtnTuChoiPhanAnh idSelected={_.get(dataSelected, "_id")} />
     <BtnTuChoiXuLy idSelected={_.get(dataSelected, "_id")} />
     <BtnBaoTrung idSelected={_.get(dataSelected, "_id")} />
     <BtnChuyenXuLy idSelected={_.get(dataSelected, "_id")} />
     <BtnTiepNhanXuLy idSelected={_.get(dataSelected, "_id")} />
    </React.Fragment>
   ) : null}
  </React.Fragment>
 )
}

export default HandleShowBtn
