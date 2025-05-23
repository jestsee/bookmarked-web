export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      TWITTER_CLIENT_ID: string;
      TWITTER_CLIENT_SECRET: string;
      BOOKMARKED_API_URL: string;
      NEXT_PUBLIC_NOTION_AUTHORIZATION_URL: string;
      NEXTAUTH_SECRET: string;
      SESSION_TOKEN_NAME: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
