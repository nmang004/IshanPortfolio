import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ne7sn5va',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  studioHost: 'ishan-portfolio',
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})