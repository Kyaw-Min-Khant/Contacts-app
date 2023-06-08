import { Tooltip } from "@mantine/core";
import React from "react";
import { AiOutlineMail, AiOutlineSchedule } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
const LineThrough = ({ user }) => {
  return (
    <div className=" border-t-2 relative my-5">
      <div className="pt-6 absolute top-[-2.6rem] left-16 sm:left-24 md:left-36 lg:left-36">
        <div className="flex gap-4 items-center">
          <div
            className={`p-2 bg-slate-100 dark:bg-gray-200 dark:shadow-none shadow-md shadow-cyan-200  rounded-full`}
          >
            <Tooltip
              label="Email"
              className="text-sm"
              color="dark"
              position="bottom"
              withArrow
              arrowSize={6}
              transitionProps={{ transition: "pop", duration: 300 }}
              closeDelay={100}
            >
              <div className="">
                <AiOutlineMail
                  className={`${
                    user?.email ? "text-blue-500" : "text-slate-400"
                  }  text-xl`}
                />
              </div>
            </Tooltip>
          </div>
          <div
            className={`p-2 bg-slate-100 dark:bg-gray-200 dark:shadow-none shadow-md shadow-cyan-200 rounded-full`}
          >
            <Tooltip
              label="Schedule"
              className="text-sm"
              color="dark"
              position="bottom"
              withArrow
              arrowSize={6}
              transitionProps={{ transition: "pop", duration: 300 }}
              closeDelay={100}
            >
              <div className="">
                <AiOutlineSchedule
                  className={`${
                    user?.date ? "text-blue-500" : "text-slate-400"
                  }  text-xl`}
                />
              </div>
            </Tooltip>
          </div>
          <div
            className={`p-2 bg-slate-100 dark:bg-gray-200 dark:shadow-none shadow-md shadow-cyan-200 rounded-full`}
          >
            <Tooltip
              label="Chat"
              className="text-sm"
              color="dark"
              position="bottom"
              withArrow
              arrowSize={6}
              transitionProps={{ transition: "pop", duration: 300 }}
              closeDelay={100}
            >
              <div className="">
                <BsChatLeft
                  className={`${
                    user?.note ? "text-blue-500" : "text-slate-400"
                  }  text-lg`}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LineThrough;
