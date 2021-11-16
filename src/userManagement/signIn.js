import { Auth } from "aws-amplify";

// async function signIn() {
//   try{
//     const user= await Auth.signIn(username, password);
//   } catch (error) {
//     console.log("error signing in", error);
//   }
// }

// async function resendConfirmationCode() {
//   try{
//     await Auth.resendSignUp(username);
//     console.log("code resent successfully");
//   } catch (err) {
//     console.log("error resending code: " , err);
//   }
// }