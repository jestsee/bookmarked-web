export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      BOOKMARKED_API_URL: string;
      // ENV: "test" | "dev" | "prod";
    }
  }
}
