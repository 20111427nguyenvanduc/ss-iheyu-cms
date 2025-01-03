// assets
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SchoolIcon from '@mui/icons-material/School';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const dashboard = {
  id: 'service-groups',
  title: '',
  type: 'group',
  children: [
    {
      id: 'app-manager',
      title: 'Quản lý ứng dụng',
      type: 'item',
      url: '/app-manager',
      icon: '/images/sidebar/icon-sidebar-tienich.png',
    },
  ],
};

export default dashboard;
