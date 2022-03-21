declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_PAT?: string;
    }
  }
}
