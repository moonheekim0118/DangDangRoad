import getFirebaseAdmin from 'firebaseConfigs/admin';

const updatePassword = async (
  id: string,
  password: string
): Promise<null | string> => {
  try {
    const admin = await getFirebaseAdmin();
    if (!admin) return null;
    const User = await admin.auth();
    // generate Custom Token For Re-Auth after updating Password
    const CustomToken = await User.createCustomToken(id);
    await User.updateUser(id, { password: password });
    return CustomToken;
  } catch (error) {
    throw error;
  }
};

export default updatePassword;
