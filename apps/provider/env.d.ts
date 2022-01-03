declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MOCK_BACKEND: boolean;
      NEXT_PUBLIC_APPOINTMENT_ENDPOINT: string;
      NEXT_PUBLIC_STORAGE_ENDPOINT: string;
      NODE_ENV: "test" | "development" | "production";
    }
  }
}
