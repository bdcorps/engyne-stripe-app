export const CONFIG = {
  BACKEND_URL: "https://app.engyne.ai",
  IMPERSONATE_USER: "",
}

export const getAccountId = (stripeUserId: string) => {
  return CONFIG.IMPERSONATE_USER ? CONFIG.IMPERSONATE_USER : stripeUserId
}
