import React from 'react'
import Dropdown from './Dropdown'
import '../css/SidePanel.css'

export default function Sidepanel({ isOpen }) {
  return (
    <>
    {isOpen &&<div className="externalPanel">
        <div className="internalPanel">
           <div className="box-type">
            {/* <Dropdown/> */}
           </div>
        </div>
    </div>}
    </>
  )
}
