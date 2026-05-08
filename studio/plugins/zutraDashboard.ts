import { definePlugin } from 'sanity'
import { ZutraDashboard } from '../components/dashboard/ZutraDashboard'
import { SquaresFour } from '@phosphor-icons/react'
import React from 'react'

const DashboardIcon = () => React.createElement(SquaresFour, { size: 18, weight: 'duotone' })

export const zutraDashboardPlugin = definePlugin({
  name: 'zutra-dashboard',
  tools: [{
    name: 'zutra-dashboard',
    title: 'Dashboard',
    icon: DashboardIcon,
    component: ZutraDashboard,
  }],
})
