declare module 'react-native-config' {
  export interface NativeConfig {
    SUPABASE_PROJ_ID: string;
    SUPABASE_ANON_KEY: string;
    USER_EMAIL: string;
    USER_PASSWORD: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
