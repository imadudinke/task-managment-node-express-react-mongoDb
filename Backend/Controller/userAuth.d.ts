import { Request, Response } from "express";
export declare const registerUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logOutUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createTeam: (req: Request, res: Response) => Promise<void>;
export declare const deleteTeam: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteLeader: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=userAuth.d.ts.map