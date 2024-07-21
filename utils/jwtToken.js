export const generateToken = (user, message, statusCode, res) => {
    
    const token = user.generateJsonWebToken();
    console.log("Generated token:", token); // Debugging log to ensure the token is generated
    const cookieName = user.role === "Admin" ? "adminToken" : "maintainerToken";
    res
        .status(statusCode)
        .cookie(cookieName,token, {
            httpOnly: true,
            secure: true, // Ensures the cookie is sent only over HTTPS
            sameSite: 'None', // Allows cross-site requests
            expires : new Date(
                Date.now()+ process.env.COOKIE_EXPIRES*24*60*60*1000
                ),
        })
        .json({
            success: true,
            message,
            cookieName,
            user,
            token
        });
       
};
