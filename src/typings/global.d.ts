declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_PAT?: string;
      MONGO_DB_URI?: string;
    }
  }
}
