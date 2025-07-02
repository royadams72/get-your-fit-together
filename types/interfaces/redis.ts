import { RootState } from "@/types/interfaces/store";

export interface UserCache {
  userSessionState: RootState;
  sessionMeta: SessionMeta;
}
export interface SessionMeta {
  userId?: any;
  anonymous?: boolean;
  sessionId: string;
}
