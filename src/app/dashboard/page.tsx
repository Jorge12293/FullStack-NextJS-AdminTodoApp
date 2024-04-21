import { WidgetItem } from "@/components/WidgetItem";
import { useSession } from "next-auth/react";
import { auth } from "../api/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  
  if(!session){
    redirect('/api/auth/signin')
  }
  return (
    <div className="grid gap-6">
       <WidgetItem title="User Connect"> 
        <div className="flex flex-col">
          <span>{session?.user?.name}</span>
          <span>{session?.user?.email}</span>
        </div>
       </WidgetItem> 
    </div>
  );
}