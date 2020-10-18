import React, {ReactElement} from 'react'
import 'styles/loader.scss'
import {classNames} from 'utils'

interface Props {
  fullscreen?: boolean
}

export function Loader({fullscreen}: Props): ReactElement {
  return (
    <div id="loader" className={classNames({fullscreen})}>
      <div className="case__loading">
        <div className="big__circle">
          <div className="inner__circle"></div>
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#39FF14" />
                  <stop offset="50%" stopColor="#00e857" /> <stop offset="100%" stopColor="#39FF14" />
                </linearGradient>
              </defs>
              <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10" stroke="url(#gradient)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
