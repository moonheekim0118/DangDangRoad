import getFirebaseAdmin from 'firebaseConfigs/admin';

const updatePassword = async (id: string, password: string) => {
  try {
    const admin = await getFirebaseAdmin();
    if (!admin) return null;
    const User = await admin.auth();
    await User.updateUser(id, { password: password });
  } catch (error) {
    throw error;
  }
};

export default updatePassword;
