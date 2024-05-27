db = db.getSiblingDB('test');
db.createCollection('users');
db.users.insert(
    {
        email: "admin@admin.com",
        password: "$2b$10$eBbGLknVw5.N8b6uw6COdeQ2mnUNXIRiDYAB6iHJgClJCa8h84Fo6"
    }
    {
        email: "jo-philippwick@masteruser.com",
        password: "$2b$10$eBbGLknVw5.N8b6uw6COdeQ2mnUNXIRiDYAB6iHJgClJCa8h84Fo6"
    }
)
