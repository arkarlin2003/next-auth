import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Social = () => {
  return (
    <div className="w-full flex gap-2 mt-5">
      <Button variant={"outline"} className="w-full" >
        <FcGoogle />
      </Button>
      <Button variant={"outline"} className="w-full" >
        <FaGithub />
      </Button>
    </div>
  );
};

export default Social;
