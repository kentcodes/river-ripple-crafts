# Vercel Setup (Checklist)

1) Import GitHub repo into Vercel (New Project → Import from Git).
2) Add Environment Variables:
   - `DATABASE_URL`
   - `LOCAL_ENC_KEY`
3) Build & deploy.
4) After deploy, open `/admin/settings/payments` and add your first connector.
5) Register webhooks on provider side (use your deployed URL + `/api/webhooks/<provider>` if you implement them).
