const userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    permissionLevel: Number
});

const userModel = mongoose.Model('Users', userSchema);