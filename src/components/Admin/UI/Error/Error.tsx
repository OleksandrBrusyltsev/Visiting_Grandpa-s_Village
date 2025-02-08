import React from 'react'

import s from './Error.module.scss'

function Error() {
  return (
    <div className={s.wrapper}>
      <div className={s.border} data-text="Error">
        <div className={`${s.title} ${s.glitch}`} data-text="Error">
          Error
        </div>
        <div className={`${s.description} ${s.glitch}`} data-text="DATA NOT FOUND">
          DATA NOT FOUND
        </div>
      </div>
    </div>
  )
}

export default Error