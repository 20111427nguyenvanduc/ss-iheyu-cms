/*jslint es6 */
import ms from 'ms';
import _ from 'lodash';
import CONSTANT_ROLE from '../components/UserManager/roleConstant.js';

const rejectMess = {
  code: 400,
  message: {
    head: 'Truy cập bị từ chối!',
    body: 'Bạn không được phép thực hiện thao tác này!'
  }
}
const funcRoles = {}
Object.keys(CONSTANT_ROLE.TRANSLATE).forEach((role, i) => {
  funcRoles[role] = ( req, res, next ) => {
    if (_.get(req, `user.roles.${role}`, 0)) return next()
    res.json(rejectMess)
  }
});
export default funcRoles
