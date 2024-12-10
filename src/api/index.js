import AuthenticateHandle from "./authenticate"

app.post("/login", AuthenticateHandle.login)
app.get("/logout", AuthenticateHandle.logout)
app.post("/logout", AuthenticateHandle.logout)
app.post("/user-inf", AuthenticateHandle.userInf)