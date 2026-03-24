import { Request, Response, NextFunction } from 'express';

/**
 * @description Wraps an asynchronous function to catch any internal errors.
 * It passes caught errors to the Express next() middleware.
 * * @param theFunction - The asynchronous controller function to wrap
 */
export const catchAsyncErrors = (
  theFunction: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Resolve the promise and catch any errors, passing them to the next middleware
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};