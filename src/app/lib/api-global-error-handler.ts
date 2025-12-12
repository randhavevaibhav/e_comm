import { NextRequest, NextResponse } from 'next/server';
import { ZodError, z } from 'zod';

// Handler function type
type ApiHandlerFunction<T> = (req: NextRequest) => Promise<NextResponse<T | { message: string, errors?: any }>>;

export const apiGlobalErrorHandler = <T>(handler: ApiHandlerFunction<T>) => {
  return async (req: NextRequest) => {
    try {
      // Execute the actual logic you pass in
      return await handler(req);
    } catch (error) {
      // Centralized Zod Error Handling
      if (error instanceof ZodError) {
        return NextResponse.json(
          { 
            message: 'Validation failed', 
            errors: z.treeifyError(error) 
          }, 
          { status: 400 }
        );
      }

      // Centralized Internal Server Error Handling
      console.error('API Error:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' }, 
        { status: 500 }
      );
    }
  };
};