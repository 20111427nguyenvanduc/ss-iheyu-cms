import passport from "passport"

import ApiProxy from "./proxy"
import ApiApp from "./app"
import ApiCaregiver from "./caregiver"
import ApiMember from "./members"
import ApiOrder from "./order"
import ApiJob from "./job"
import ApiFeedback from "./feedback"
import ApiHospital from "./hospital"
import ApiPartner from "./partner"
import ApiStatistic from "./statistics"
import Messages from "./messages"
import GoogleMap from "./googleMap"
import Notify from "./notify"
import ApiUser from "./user"
import Lecture from "./lecture"
import LectureClean from "./lectureClean"
import HotNew from "./hotnew"
import ApiOrderClean from "./orderClean"
import ApiPromote from "./promote"
import ApiPriceIncreaseClean from "./priceIncreaseClean"
import ApiPriceIncreaseCare from "./priceIncreaseCare"
import ApiPromotesMember from "./promotesMember"
//App
app.post("/api/app/user-inf", ApiApp.userInf)
app.post("/api/app/change-password", ApiApp.changePassword)
app.post("/api/app/get-region", ApiApp.getRegion)

//Members
app.post("/api/member/list", ApiMember.listMemberHeyCare)
app.post("/api/member/authen", ApiMember.authenHeyCare)
app.post("/api/staff/get-nearest", ApiMember.getStaffNearest)
app.post("/api/staff/get-valid", ApiMember.getStaffValid)
app.post("/api/member/open-training", ApiMember.openTraining)
app.post("/api/member/block-member", ApiMember.blockMember)
app.post("/api/member/unblock-member", ApiMember.unblockMember)
app.post("/api/member/charge-member", ApiMember.chargeMember)
app.post("/api/member/charge-log-analytic", ApiMember.chargeLogAnalytic)
app.post("/api/member/charge-log", ApiMember.chargeLog)
app.post("/api/members/member-log-create", ApiMember.memberLogCreate)
app.post("/api/members/member-log-list", ApiMember.memberLogList)

//Caregiver
app.post("/api/caregiver/list", ApiCaregiver.listCaregiverHeyCare)
app.post("/api/caregiver/authen-update", ApiCaregiver.updateAuthenHeyCare)

//Order
app.post("/api/order-type-care/list", ApiOrder.listOrderType)
app.post("/api/order/list", ApiOrder.listOrderHeyCare)
app.post("/api/order-job/list", ApiOrder.listOrderJobHeyCare)
app.post("/api/order/detail", ApiOrder.detailOrderHeyCare)
app.post("/api/order/change-status", ApiOrder.changeStatusOrderHeyCare)
app.post("/api/order/reject", ApiOrder.rejectOrderHeyCare)
app.post("/api/order/retry", ApiOrder.retryOrderHeyCare)
app.post("/api/order-job/reject", ApiOrder.rejectJobHeyCare)
app.post("/api/order-job/retry", ApiOrder.retryJobHeyCare)
app.post("/api/order-job/assign", ApiOrder.assignJobStaff)
app.post("/api/order-job/switch", ApiOrder.switchJobStaff)
app.post("/api/order/log", ApiOrder.orderLog)

//Order clean
app.post("/api/order-type-clean/list", ApiOrderClean.listOrderType)
app.post("/api/order-clean/list", ApiOrderClean.listOrderHeyCare)
app.post("/api/order-clean-job/list", ApiOrderClean.listOrderJobHeyCare)
app.post("/api/order-clean/detail", ApiOrderClean.detailOrderHeyCare)
app.post("/api/order-clean/change-status", ApiOrderClean.changeStatusOrderHeyCare)
app.post("/api/order-clean/reject", ApiOrderClean.rejectOrderHeyCare)
app.post("/api/order-clean/retry", ApiOrderClean.retryOrderHeyCare)
app.post("/api/order-clean-job/reject", ApiOrderClean.rejectJobHeyCare)
app.post("/api/order-clean-job/retry", ApiOrderClean.retryJobHeyCare)
app.post("/api/order-clean-job/assign", ApiOrderClean.assignJobStaff)
app.post("/api/order-clean-job/switch", ApiOrderClean.switchJobStaff)
app.post("/api/order-clean-job/switch-leader", ApiOrderClean.switchJobLeader)
app.post("/api/order-clean/log", ApiOrderClean.orderLog)
app.post("/api/admin/job-change-working-time", ApiOrderClean.jobChangeWorkingTime)
app.post("/api/admin/order-push-all-staff", ApiOrderClean.pushAllStaffJob)

//user
app.post("/api/user/list", ApiUser.list)
app.post("/api/user/create", ApiUser.create)
app.post("/api/user/update", ApiUser.update)
app.post("/api/user/active", ApiUser.active)
app.post("/api/user/read", ApiUser.read)

///job
app.post("/api/order/list-rejected", ApiOrder.listOrderRejected)
app.post("/api/order/job-inf", ApiOrder.getOrderCareInf)
app.post("/api/order/register", ApiOrder.registerOrderCare)
app.post("/api/order/search-by-phone", ApiOrder.searchByPhoneOrderCare)
app.post("/api/order-job/list-lated", ApiOrder.listOrderJobLated)
app.post("/api/order-job/list-need-contact", ApiOrder.listOrderJobNeedContact)
app.post("/api/order-job/list-need-confirm", ApiOrder.listOrderJobNeedConfirm)
app.post("/api/order-job/list-need-done", ApiOrder.listOrderJobNeedDone)
app.post("/api/order-job/list-need-moving", ApiOrder.listOrderJobNeedMoving)
app.post("/api/order-job/list-need-training", ApiOrder.listJobNeedTraining)
app.post("/api/order-job/job-inf", ApiOrder.getOrderCareJobInf)
app.post("/api/order-job/register", ApiOrder.registerOrderCareJob)
app.post("/api/order-job/search-by-phone", ApiOrder.searchByPhoneOrderCareJob)
app.post("/api/order-job/log", ApiOrder.jobLog)
app.post("/api/order-job/promote-approve", ApiOrder.promoteApprove)
app.post("/api/order-job/promote-reject", ApiOrder.promoteReject)

///job clean
app.post("/api/order-clean/list-rejected", ApiOrderClean.listOrderRejected)
app.post("/api/order-clean/job-inf", ApiOrderClean.getOrderCareInf)
app.post("/api/order-clean/register", ApiOrderClean.registerOrderCare)
app.post("/api/order-clean/search-by-phone", ApiOrderClean.searchByPhoneOrderCare)
app.post("/api/order-clean-job/list-lated", ApiOrderClean.listOrderJobLated)
app.post("/api/order-clean-job/list-need-contact", ApiOrderClean.listOrderJobNeedContact)
app.post("/api/order-clean-job/list-need-confirm", ApiOrderClean.listOrderJobNeedConfirm)
app.post("/api/order-clean-job/list-need-done", ApiOrderClean.listOrderJobNeedDone)
app.post("/api/order-clean-job/list-need-moving", ApiOrderClean.listOrderJobNeedMoving)
app.post("/api/order-clean-job/list-need-training", ApiOrderClean.listJobNeedTraining)
app.post("/api/order-clean-job/job-inf", ApiOrderClean.getOrderCareJobInf)
app.post("/api/order-clean-job/register", ApiOrderClean.registerOrderCareJob)
app.post("/api/order-clean-job/search-by-phone", ApiOrderClean.searchByPhoneOrderCareJob)
app.post("/api/order-clean-job/log", ApiOrderClean.jobLog)
app.post("/api/order-clean-job/promote-approve", ApiOrderClean.promoteApprove)
app.post("/api/order-clean-job/promote-reject", ApiOrderClean.promoteReject)

//CMS job
app.post("/api/job/get-list", ApiJob.getRegistedList)
app.post("/api/job/note", ApiJob.noteJob)
app.post("/api/job/done", ApiJob.doneJob)
app.post("/api/job/release", ApiJob.releaseJob)
app.post("/api/job/pending", ApiJob.pendingJob)
app.post("/api/job/process", ApiJob.processJob)
app.post("/api/job/get-log", ApiJob.getLogJob)
app.post("/api/job/transfer", ApiJob.transferJob)
app.post("/api/job/get-all-users", ApiJob.getListUsers)
app.post("/api/job/save-result", ApiJob.saveResultJob)

//Feedback
app.post("/api/feedback/get-list", ApiFeedback.getFeedback)
app.post("/api/feedback/get-inf", ApiFeedback.getFeedbackInf)
app.post("/api/feedback/register", ApiFeedback.registerFeedback)
app.post("/api/feedback/search-by-phone", ApiFeedback.searchByPhoneFeedback)

app.post("/api/rating/get-list", ApiFeedback.getRating)
app.post("/api/rating/get-inf", ApiFeedback.getRatingInf)
app.post("/api/rating/register", ApiFeedback.registerRating)
app.post("/api/rating/search-by-phone", ApiFeedback.searchByPhoneRating)
app.post("/api/rating/approve", ApiFeedback.ratingStar)

//rating clean
app.post("/api/rating-clean/get-list", ApiFeedback.getRating)
app.post("/api/rating-clean/get-inf", ApiFeedback.getRatingInf)
app.post("/api/rating-clean/register", ApiFeedback.registerRating)
app.post("/api/rating-clean/search-by-phone", ApiFeedback.searchByPhoneRating)
app.post("/api/rating-clean/approve", ApiFeedback.ratingStar)

//Statistic
app.post("/api/statistic/revenue", ApiStatistic.revenue)
app.post("/api/statistic/statistic-job", ApiStatistic.statisticJob)
app.post("/api/statistic/revenue-clean", ApiStatistic.revenueClean)
app.post("/api/statistic/statistic-clean", ApiStatistic.statisticJobClean)

//messages
app.post("/api/messages/get", Messages.getMessages)

//map
app.post("/api/google-map/show", GoogleMap.showLocations)
app.post("/api/google-map/get-current-location", GoogleMap.getMemberCurrentLocation)
app.post("/api/google-map/get-name", GoogleMap.getLocationNameByLatLng)
app.post("/api/location/place-autocomplete", GoogleMap.predictLocation)
app.post("/api/location/place-detail", GoogleMap.getLocation)

//hospital
app.post("/api/hospital/list", ApiHospital.list)
app.post("/api/hospital/add", ApiHospital.add)
app.post("/api/hospital/modify", ApiHospital.modify)
app.post("/api/hospital/inactive", ApiHospital.inactive)

//partner
app.post("/api/partner/list", ApiPartner.list)
app.post("/api/partner/add", ApiPartner.add)
app.post("/api/partner/modify", ApiPartner.modify)
app.post("/api/partner/inactive", ApiPartner.inactive)

//notify
app.post("/api/notify/send", Notify.sendNotifyMsg)

//Lecture
app.post("/api/lecture/list", Lecture.lectureList)
app.post("/api/lecture/add", Lecture.lectureAdd)
app.post("/api/lecture/modify", Lecture.lectureModify)
app.post("/api/lecture/inactive", Lecture.lectureInActive)
app.post("/api/lecture/arrange", Lecture.lectureArrange)
app.post("/api/test/list", Lecture.testList)
app.post("/api/test/add", Lecture.testAdd)
app.post("/api/test/modify", Lecture.testModify)
app.post("/api/test/inactive", Lecture.testInActive)
app.post("/api/test/arrange", Lecture.testArrange)
app.post("/api/answer/add", Lecture.answerAdd)
app.post("/api/answer/modify", Lecture.answerModify)

//Lecture clean
app.post("/api/lecture-clean/list", LectureClean.lectureList)
app.post("/api/lecture-clean/add", LectureClean.lectureAdd)
app.post("/api/lecture-clean/modify", LectureClean.lectureModify)
app.post("/api/lecture-clean/inactive", LectureClean.lectureInActive)
app.post("/api/lecture-clean/arrange", LectureClean.lectureArrange)
app.post("/api/test-clean/list", LectureClean.testList)
app.post("/api/test-clean/add", LectureClean.testAdd)
app.post("/api/test-clean/modify", LectureClean.testModify)
app.post("/api/test-clean/inactive", LectureClean.testInActive)
app.post("/api/test-clean/arrange", LectureClean.testArrange)
app.post("/api/answer-clean/add", LectureClean.answerAdd)
app.post("/api/answer-clean/modify", LectureClean.answerModify)

//Hot new
app.post("/api/hot-news/list", HotNew.list)
app.post("/api/hot-news/create", HotNew.create)
app.post("/api/hot-news/update", HotNew.update)
app.post("/api/hot-news/notification-list", HotNew.notificationList)

//staff done promote heycare
app.post("/api/staff-done-promote-heycare/list", ApiPromote.staffDonePromoteHeycareList)
app.post("/api/staff-done-promote-heycare/register", ApiPromote.staffDonePromoteHeycareRegister)
app.post("/api/staff-done-promote-heycare/get", ApiPromote.staffDonePromoteHeycareGet)
app.post("/api/staff-done-promote-heycare/find-by-phone", ApiPromote.staffDonePromoteHeycareFindByPhone)

//staff done promote heyclean
app.post("/api/staff-done-promote-clean/list", ApiPromote.staffDonePromoteCleanList)
app.post("/api/staff-done-promote-clean/register", ApiPromote.staffDonePromoteCleanRegister)
app.post("/api/staff-done-promote-clean/get", ApiPromote.staffDonePromoteCleanGet)
app.post("/api/staff-done-promote-clean/find-by-phone", ApiPromote.staffDonePromoteCleanFindByPhone)

//PriceIncreaseClean
app.post("/api/price-increase-clean/list", ApiPriceIncreaseClean.list)
app.post("/api/price-increase-clean/create", ApiPriceIncreaseClean.create)
app.post("/api/price-increase-clean/update", ApiPriceIncreaseClean.update)
app.post("/api/price-increase-clean/delete", ApiPriceIncreaseClean.delete)

//PriceIncreaseCare
app.post("/api/price-increase-care/list", ApiPriceIncreaseCare.list)
app.post("/api/price-increase-care/create", ApiPriceIncreaseCare.create)
app.post("/api/price-increase-care/update", ApiPriceIncreaseCare.update)
app.post("/api/price-increase-care/delete", ApiPriceIncreaseCare.delete)

//promote member
app.post("/api/promote/list-promote", ApiPromotesMember.getListPromote)
app.post("/api/promote/get-author-add-promotes", ApiPromotesMember.getAllAuthor)
app.post("/api/promote/get-phone-inf-promote", ApiPromotesMember.getInfPhonePromote)
app.post("/api/promote/add-promote-to-member-v2", ApiPromotesMember.addPromoteToMember_v2)

//config
import ApiConfig from "./config"
app.post("/api/config/get-cms-config", ApiConfig.getCmsConfig)
//Proxy
app.post("/api/proxy/image", ApiProxy.image)

//logout
app.get("/logout", (req, res) => {
 req.logout()
 res.redirect("/login")
})
//login
app.post("/login", (req, res, next) => {
 const {lastpath, username} = req.body
 let ip = `${req.headers["x-real-ip"]} ${req.headers["x-forwarded-for"]} ${req.socket.remoteAddress} ${req.ip}`
 passport.authenticate("local", (err, user, info = {}) => {
  if (err) {
   return next(err)
  }
  if (!user) {
   res.json({
    code: 400,
    message: info.message,
   })
  } else {
   // if everything's OK
   req.logIn(user, (err) => {
    if (err) {
     req.session.messages = "Error"
     return next(err)
    }
   })
   res.json({
    code: 200,
    data: lastpath || "",
   })
  }
 })(req, res, next)
})
