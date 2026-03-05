import React from "react";

const AVATAR_IMAGE =
  "https://www.figma.com/api/mcp/asset/acae4399-7288-4d91-a050-01e52dd4f9f2";
const AVATAR_RING =
  "https://www.figma.com/api/mcp/asset/d3ba3db0-537e-466e-a429-eb395e769d2a";
function InfoIconSmall() {
  return (
    <svg className="shrink-0 -scale-y-100" width="16" height="16" viewBox="0 0 13.3333 13.3333" fill="none">
      <path d="M6.66667 0C2.99333 0 0 2.99333 0 6.66667C0 10.34 2.99333 13.3333 6.66667 13.3333C10.34 13.3333 13.3333 10.34 13.3333 6.66667C13.3333 2.99333 10.34 0 6.66667 0ZM6.16667 4C6.16667 3.72667 6.39333 3.5 6.66667 3.5C6.94 3.5 7.16667 3.72667 7.16667 4V7.33333C7.16667 7.60667 6.94 7.83333 6.66667 7.83333C6.39333 7.83333 6.16667 7.60667 6.16667 7.33333V4ZM7.28 9.58667C7.24667 9.67333 7.2 9.74 7.14 9.80667C7.07333 9.86667 7 9.91333 6.92 9.94667C6.84 9.98 6.75333 10 6.66667 10C6.58 10 6.49333 9.98 6.41333 9.94667C6.33333 9.91333 6.26 9.86667 6.19333 9.80667C6.13333 9.74 6.08667 9.67333 6.05333 9.58667C6.02 9.50667 6 9.42 6 9.33333C6 9.24667 6.02 9.16 6.05333 9.08C6.08667 9 6.13333 8.92667 6.19333 8.86C6.26 8.8 6.33333 8.75333 6.41333 8.72C6.57333 8.65333 6.76 8.65333 6.92 8.72C7 8.75333 7.07333 8.8 7.14 8.86C7.2 8.92667 7.24667 9 7.28 9.08C7.31333 9.16 7.33333 9.24667 7.33333 9.33333C7.33333 9.42 7.31333 9.50667 7.28 9.58667Z" fill="#B5B5C5" />
    </svg>
  );
}

export function UserCard() {
  return (
    <div className="bg-surface-card flex flex-col items-start p-3 rounded-card-lg shadow-header w-full">
      <div className="flex gap-4 items-center w-full">
        {/* Avatar with story ring */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <div className="flex-1 h-full min-h-px min-w-px relative rounded-[50px]">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none rounded-[50px]"
            >
              <div className="absolute inset-0 bg-surface-card rounded-[50px]" />
              <img
                src={AVATAR_IMAGE}
                alt="Avatar"
                className="absolute inset-0 w-full h-full object-cover rounded-[50px]"
              />
            </div>
          </div>
          <img
            src={AVATAR_RING}
            alt=""
            className="absolute inset-0 block w-full h-full max-w-none"
          />
        </div>

        {/* Name + Progress */}
        <div className="flex flex-col gap-2 items-start flex-1 min-w-0 min-h-px">
          <span className="text-lg text-primary-400 whitespace-nowrap leading-[16px]">
            @hippopotamus
          </span>

          {/* Progress bar V2 */}
          <div className="flex flex-col gap-0.5 items-start w-full">
            <div className="flex gap-2 items-start justify-center w-full">
              <div className="flex flex-1 gap-1 items-center min-w-0 min-h-px">
                <span className="text-lg text-primary-400 whitespace-nowrap leading-[16px]">
                  Novice
                </span>
                <InfoIconSmall />
              </div>
              <span className="flex-1 text-lg text-primary-400 text-right min-w-0 min-h-px leading-[16px]">
                23.5%
              </span>
            </div>

            {/* Track */}
            <div className="bg-secondary-20 flex items-start overflow-clip rounded-input w-full">
              <div
                className="bg-brand-500 h-2 rounded-input"
                style={{ width: "23.5%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
