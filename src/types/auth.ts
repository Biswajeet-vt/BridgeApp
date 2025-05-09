export interface AuthResponse {
  status: number;
  login_basic: {
    tokens: {
      access_token: string;
      refresh_token: string;
      pair_id: string;
      access_expires_at: number;
      refresh_expires_at: number;
    };
    user: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      phone: string;
      email_verified: boolean;
      phone_verified: boolean;
      mfa_enabled: boolean;
      do_not_ask_mfa_again: boolean;
      should_reset_password: boolean;
      rep_code: string;
      locale_id: number;
      locale: string | null;
      initiator_id: number;
      allow_feedback: boolean;
      big_avatar_url: string;
      small_avatar_url: string;
      exceeded_rate_limits: any;
      created_at: string;
      updated_at: string;
      watchmen_user_links: Array<{
        id: number;
        watchmen_user_id: number;
        watchmen_instance_id: number;
        branch_id: number;
        created_at: string;
        updated_at: string;
        watchmen_instance: {
          id: number;
          name: string;
          slug: string;
          url: string;
          created_at: string;
          updated_at: string;
        };
        branch: {
          id: number;
          slug: string;
          code: string;
          name: string;
          firm_id: number;
        };
      }>;
    };
  };
  redirect_to: string;
  email_verification_needed: boolean;
  phone_verification_needed: boolean;
  should_enable_mfa: boolean;
}
export interface WatchmenTokenResponse {
  status: number;
  data: {
    token: string;
    expires_at: number;
  };
};
export interface SessionIdResponse {
  sessionId: string;
  stage: string;
}
export interface MiddleWareResponse {
  apiToken: string;
  accessToken: string;
  refreshToken: string;
  assetsToken: string;
}