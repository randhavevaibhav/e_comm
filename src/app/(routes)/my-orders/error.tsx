"use client";

import { Button } from "@/app/components/ui/button";

const MyOrdersPageError = ({
    error,
    reset
}:{
  error: Error & { digest?: string };
  reset: () => void;
})=>{
     return (
    <div className="p-4 border border-red-500 rounded bg-red-50">
      <h2 className="text-red-800 font-bold">Something went wrong!</h2>
      <p className="text-red-600">{error.message}</p>
      <Button 
        onClick={() => reset()} // Attempts to re-render the segment
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
      >
        Try Again
      </Button>
    </div>
  );
}

export default MyOrdersPageError;