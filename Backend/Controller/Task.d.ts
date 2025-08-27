import { Request, Response } from "express";
export declare const createTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTasksByAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=Task.d.ts.map