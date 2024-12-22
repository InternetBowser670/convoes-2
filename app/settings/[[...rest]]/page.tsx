import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return(
    <>
        <div className="h-full w-full flex justify-center">
          <UserProfile />
        </div>
    </>
  )
}