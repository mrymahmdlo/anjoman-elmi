import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="http://Bartarha.net" target="_blank" rel="noopener noreferrer">Bartarha.net</a>
        <span className="ml-1">&copy; 2021 Tehran.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
