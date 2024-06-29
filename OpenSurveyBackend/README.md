# Endpoints

## Manage User / Authentication
1. Login : (Post) https://localhost:7164/api/account/login<br/>
  {"email": "email@.com", "password": "password"}
2. Register user : (Post) https://localhost:7164/api/account/register<br/>
  {"email": "email@.com", "password": "password", "userName": "name"}
3. List all users :  (Get) https://localhost:7164/api/account/list<br/>
  return list of all users email , IsActive, UserName for now
4. Deactivate user : (Patch)  https://localhost:7164/api/account/deactivate/<id>
  Deactiavte user account
5. Activate user : (Patch)  https://localhost:7164/api/account/activate/<id>
  Activate user account
