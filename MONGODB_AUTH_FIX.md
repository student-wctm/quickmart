# MongoDB Atlas Authentication Error - How to Fix

The backend is connecting to MongoDB Atlas but authentication is failing. Here's how to fix it:

## Step 1: Verify Your Database User in MongoDB Atlas

1. **Go to MongoDB Atlas** (https://cloud.mongodb.com)
2. **Click on "Database Access"** in the left sidebar
3. **Check if user exists**: Look for `snapwc65_db_user`

## Step 2: If User Doesn't Exist or Password is Wrong

### Option A: Create a New User (Recommended)

1. Click **"Add New Database User"**
2. **Authentication Method**: Password
3. **Username**: `quickmart_user`
4. **Password**: `QuickMart123` (use this exact password for now)
5. **Database User Privileges**: Select "Read and write to any database"
6. Click **"Add User"**

### Option B: Edit Existing User

1. Find your user `snapwc65_db_user`
2. Click **"Edit"** button
3. Click **"Edit Password"**
4. Set a new password: `QuickMart123`
5. Click **"Update User"**

## Step 3: Verify Network Access

1. Click **"Network Access"** in left sidebar
2. Ensure you have **"0.0.0.0/0"** (Allow from anywhere) OR your current IP address
3. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"**

## Step 4: Get NEW Connection String

1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. **Driver**: Node.js
5. **Version**: 5.5 or later
6. **Copy the connection string**

It should look like:
```
mongodb+srv://quickmart_user:<password>@cluster0.d2otalv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

7. **Replace `<password>`** with your actual password (e.g., `QuickMart123`)

## Step 5: Update Your .env File

Replace the MONGODB_URI in `backend/.env` with:

```
MONGODB_URI=mongodb+srv://quickmart_user:QuickMart123@cluster0.d2otalv.mongodb.net/quick-commerce?retryWrites=true&w=majority
```

**Important**: If your password contains special characters like `@`, `#`, `$`, `%`, etc., you need to URL encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`

Example: Password `Pass@123` becomes `Pass%40123`

## Step 6: Restart Backend

The backend should auto-restart. If not, I can restart it for you.

## Quick Test Connection String

Try this simplified version first:

```
mongodb+srv://quickmart_user:QuickMart123@cluster0.d2otalv.mongodb.net/quick-commerce
```

---

## Alternative: Double-Check Your Original Credentials

If you want to use your original credentials (`snapwc65_db_user`):

1. Verify the username is exactly: `snapwc65_db_user`
2. Verify the password is exactly: `snapwc@05`
3. The encoded version should be: `snapwc%4005`

**Connection string should be:**
```
mongodb+srv://snapwc65_db_user:snapwc%4005@cluster0.d2otalv.mongodb.net/quick-commerce?retryWrites=true&w=majority
```

---

## Need Help?

Reply with:
1. Your MongoDB Atlas username
2. Your password (I'll encode it properly)
3. Or create a new simple user with username `quickmart_user` and password `QuickMart123`

Once you have the correct credentials, just paste the connection string and I'll update the .env file!
