import { Request, Response } from "express";
export declare const getRequestToLeader: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAdminData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getLeaderData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTeamData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getLeadersDataByAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTeamDataByLeader: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllTasksAssigned: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=getData.d.ts.map