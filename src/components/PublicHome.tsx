"use client"

import React, { useState } from 'react'
import HeroSection from './HeroSection'
import VehicleSlider from './VehicleSlider'
import AuthModal from './AuthModal'

function PublicHome() {
    const [authOpen, setAuthOpen] = useState(false)
  return (
    <>
        <HeroSection onAuthRequired = {() => setAuthOpen(true)} />   {/* Jabhi hum hero section ke andar, onAuthRequired function ko call lagayenge toh humare paas auth modal open hoke aayega */}
        <VehicleSlider />  
        <AuthModal open = {authOpen} onClose ={() => setAuthOpen(false)} />
    </>
  )
}

export default PublicHome