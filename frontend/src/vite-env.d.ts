/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly MAPS_KEY: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }