import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'داشبرد',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: '',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['مشاوره و برنامه ریزی']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'تماس های تلفنی',
    icon: 'cil-phone',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'تماس های دقیقه ای',
        to: '/Consultation/MinuteCalls',
      },
    ],
  },
]

export default _nav
