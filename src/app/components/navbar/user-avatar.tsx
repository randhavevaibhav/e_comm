"use client";

import { useAuth } from "@/app/(routes)/auth/_auth-contexts/auth-context";
import { UserIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const UserAvatar = () => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <div>
          <div className="p-3 border-2 border-accent-foreground rounded-full cursor-pointer" data-test={"user-avatar"}>
            <UserIcon />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{user.email}</p>
      </TooltipContent>
    </Tooltip>
  );
};
