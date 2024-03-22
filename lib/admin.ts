import { auth } from "@clerk/nextjs"

export const isAdmin = () => {
  const { userId} = auth();

  if(!userId){
    return false
  }

  return userId === "user_2dre3VPzZB5XGBoOG3fUC46o0ql"
}