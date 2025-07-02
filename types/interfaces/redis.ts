import { RootState } from "@/types/interfaces/store";

export interface UserCache {
  userSessionState: RootState;
  sessionMeta: { userId?: any; anonymous?: boolean; sessionId: string };
}
