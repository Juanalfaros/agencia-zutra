import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'elgye97d',
    dataset: 'production'
  },
  deployment: {
    appId: 'gl0lpwimmbcq21q26dns06uc',
    autoUpdates: true,
  }
})
