# SSL Error Fix - MongoDB Atlas

We're getting an SSL/TLS error when connecting to MongoDB Atlas. This typically indicates an IP whitelist or permissions issue.

## Quick Fix Steps:

### 1. **Verify Network Access (Most Common Issue)**

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click **"Network Access"** in the left sidebar
3. Check if your IP address is whitelisted

**Fix:**
- Click **"Add IP Address"**
- Click **"Allow Access from Anywhere"** button
- This adds **0.0.0.0/0** which allows all IPs (safe for development)
- Click **"Confirm"**
- Wait 1-2 minutes for the change to propagate

### 2. **Verify Database User Permissions**

1. Click **"Database Access"** in the left sidebar
2. Find the user: **`quickmart`**
3. Check that **"Built-in Role"** shows: **"Read and write to any database"**

**If not:**
- Click **"Edit"** on the user
- Under "Database User Privileges", select **"Built-in Role"**
- Choose **"Read and write to any database"**
- Click **"Update User"**

### 3. **Verify Connection String**

Current connection string in `.env`:
```
mongodb+srv://quickmart:Quick123@cluster0.d2otalv.mongodb.net/quick-commerce?retryWrites=true&w=majority
```

**Get fresh connection string from Atlas:**
1. Click **"Database"** in left sidebar  
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the new connection string
5. Replace `<password>` with `Quick123`
6. Reply with the new string

### 4. **Test in MongoDB Compass (Optional)**

Download MongoDB Compass: https://www.mongodb.com/try/download/compass

Try connecting with:
```
mongodb+srv://quickmart:Quick123@cluster0.d2otalv.mongodb.net/quick-commerce
```

If Compass can connect, the credentials are correct and it's a Node.js/SSL issue.

## Alternative: Use Standard Connection (Not SRV)

If SSL errors persist, we can try a standard connection string instead of SRV:

1. In MongoDB Atlas, click "Connect"
2. Choose "Connect your application"
3. Select "Driver: Node.js" and "Version: 2.2.12 or later" (shows standard format)
4. Copy that connection string

---

## What to Check Right Now:

1. ✅ Go to **Network Access** → Add **0.0.0.0/0** if not present
2. ✅ Wait 1-2 minutes after adding IP
3. ✅ Reply when done, and I'll restart the backend

---

## If Nothing Works:

**Create a brand new cluster:**
1. In Atlas, create a new M0 FREE cluster
2. Name it differently (e.g., `Cluster1`)
3. Create user: `quickmart` / `Quick123`
4. Whitelist **0.0.0.0/0**
5. Get new connection string
6. Reply with new connection string

I'll update and restart immediately! 🚀
